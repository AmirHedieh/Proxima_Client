import { observable, reaction } from 'mobx'
import { EnvironmentVariables } from '../Constants'
import { Category } from '../models/Category'
import { MinimalProduct } from '../models/MinimalProduct'
import { Museum } from '../models/Museum'
import { Product } from '../models/Product'
import { Store } from '../models/Store'
import { CustomResponse } from '../network/CustomResponse'
import { HttpManager } from '../network/HttpManager'
import { SocketManager } from '../network/SocketManager'
import { UserIdStorage } from '../storage/UserIdStorage'
import { DetectionState } from '../Types'
import { BeaconDetector, IBeaconDetector } from './BeaconDetector'
import { BeaconEngine } from './BeaconEngine'
import { INavigationHandler, NavigationHandler } from './NavigationHandler'

interface IFetchData {
    minimalProductsOffset: number
    category: number
    isLoadingCategory: boolean
}

const fetchDataInitialValue: IFetchData = {
    minimalProductsOffset: 0,
    category: null,
    isLoadingCategory: false
}
export class AppEngine {
    @observable public store: Museum = null
    @observable public products: Map<number, MinimalProduct> = new Map<number, MinimalProduct>()
    @observable public categories: Map<number, Category> = new Map<number, Category>()
    @observable public currentProduct: Product = null
    @observable public detectionState: DetectionState = 'NO_STORE_NO_BEACON'
    @observable public fetchData = fetchDataInitialValue

    private navHandler: INavigationHandler = null
    private beaconDetector: IBeaconDetector = null
    private beaconEngine: BeaconEngine = null
    private userId: string = null
    // private socketManager: SocketManager = SocketManager.getInstance()

    public constructor() {
        this.navHandler = new NavigationHandler(this.detectionState)
        reaction(
            () => this.detectionState,
            () => this.navHandler.navigate(this.detectionState)
        )
        this.beaconDetector = new BeaconDetector()
        this.beaconEngine = new BeaconEngine(this.beaconDetector)

        // this.socketManager.onConnect(this.onConnect)
        // this.socketManager.onReconnect(this.onReconnect)
        // this.socketManager.onDisconnect(this.onDisconnect)
        // this.socketManager.onRegister(this.onRegister)
        // this.socketManager.onStaticData(this.onStaticData)
        // this.socketManager.onMajorChange(this.onMajorChange)
        // this.socketManager.onMinorChange(this.onMinorChange)
        // this.socketManager.onGetProducts(this.onGetProducts)

        this.beaconEngine.onMajorChange = this.majorChange
        this.beaconEngine.onMinorChange = this.minorChange
    }

    public init(): void {
        return this.beaconEngine.init()
    }

    public startDetecting(): Promise<boolean> {
        return this.beaconEngine.startDetecting()
    }

    public stopDetecting(): Promise<boolean> {
        return this.beaconEngine.stopDetecting()
    }

    public resetMinor(): void {
        return this.beaconEngine.resetMinor()
    }

    public emitMinimalProductFetch = (params: { category: number }) => {
        if (params.category !== this.fetchData.category) {
            this.fetchData.isLoadingCategory = true // set loading true when _new_ category is fetched
            this.fetchData.minimalProductsOffset = 0
            this.fetchData.category = params.category
            this.products = new Map<number, MinimalProduct>()
        }
        this.socketManager.getProduct({
            category: params.category,
            offset: this.fetchData.minimalProductsOffset,
            limit: 10
        })
    }

    private emitMajorChange = (major) => {
        console.log('emit major', major)
        this.socketManager.majorChange({ major })
    }

    private emitMinorChange = (minor) => {
        console.log('emit minor: ', minor)
        this.socketManager.minorChange({ minor })
    }

    private onConnect = async () => {
        console.log('connected')
        const userId = await UserIdStorage.get()
        if (userId) {
            // authorize
            this.userId = userId
            this.socketManager.authorize({ id: userId })
        } else {
            this.socketManager.register()
        }
    }

    private onReconnect = () => {
        console.log('Reconnected')
    }

    private onDisconnect = async () => {
        console.log('Disconnected')
        await this.beaconEngine.stopDetecting()
    }

    private onRegister = async (response: CustomResponse) => {
        await UserIdStorage.set(response.getData().id)
        this.userId = response.getData().id
    }

    private onStaticData = async (response: CustomResponse) => {
        if (EnvironmentVariables.version !== response.getData().version) {
            console.log('app needs to update')
        }

        for (const element of response.getData().categories) {
            const category = new Category(element)
            this.categories.set(category.id, category)
        }
        await this.beaconEngine.startDetecting()
    }

    private majorChange = async (major: number) => {
        if (major) {
            console.log('sending "get museum" major', major)
            const response = await HttpManager.getInstance().getMuseum({
                museumId: major
            })
            console.log('get museum response', response)
            if (response.isSuccessful && response.getData()) {
                console.log('Museum created, Navigating...')
                this.store = new Museum(response.getData())
                this.detectionState = 'FOUND_STORE_NO_BEACON'
                return
            }
        }
        this.detectionState = 'NO_STORE_NO_BEACON'
        this.store = null
    }

    private minorChange = async (major:number, minor: number) => {
        console.log('sending "get product" minor', minor)
        const response = await HttpManager.getInstance().getProducts({
            museumId: major,
            productId: minor
        })
        console.log('get museum response', response)
        if (response.getData()) {
            this.currentProduct = new Product(response.getData())
            this.detectionState = 'FOUND_STORE_FOUND_BEACON'
            return
        }
        /** codes reach here if product is null */
        // user was not in store
        if (this.detectionState === 'NO_STORE_NO_BEACON') {
            this.currentProduct = null
            return
        }
        // user was in store and was near beacon
        if (this.detectionState === 'FOUND_STORE_FOUND_BEACON') {
            this.detectionState = 'FOUND_STORE_NO_BEACON'
            this.currentProduct = null
            return
        }
    }

    private onMajorChange = (response: CustomResponse) => {
        console.log('major from server', response)
        if (response.getData().store) {
            this.store = new Museum(response.getData().store)
            this.detectionState = 'FOUND_STORE_NO_BEACON'
            // reset previous fetch data & fetched products
            this.fetchData = fetchDataInitialValue
            this.products = new Map<number, MinimalProduct>()
            // fetch first products
            this.emitMinimalProductFetch({ category: null })
            return
        }
        this.detectionState = 'NO_STORE_NO_BEACON'
        this.products = new Map<number, MinimalProduct>()
        this.fetchData = fetchDataInitialValue
        this.store = null
    }

    private onMinorChange = (response: CustomResponse) => {
        console.log('minor from server', response)
        if (response.getData().product) {
            this.currentProduct = new Product(response.getData().product)
            this.detectionState = 'FOUND_STORE_FOUND_BEACON'
            return
        }
        /** codes reach here if product is null */
        // user was not in store
        if (this.detectionState === 'NO_STORE_NO_BEACON') {
            this.currentProduct = null
            return
        }
        // user was in store and was near beacon
        if (this.detectionState === 'FOUND_STORE_FOUND_BEACON') {
            this.detectionState = 'FOUND_STORE_NO_BEACON'
            this.currentProduct = null
            return
        }
    }

    private onGetProducts = (response: CustomResponse) => {
        this.fetchData.isLoadingCategory = false
        for (const element of response.getData().products) {
            this.fetchData.minimalProductsOffset++
            const product = new MinimalProduct(element)
            this.products.set(product.id, product)
        }
    }
}
