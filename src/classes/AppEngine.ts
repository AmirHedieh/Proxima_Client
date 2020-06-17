import { computed, observable, reaction } from 'mobx'
import { EnvironmentVariables } from '../Constants'
import { Category } from '../models/Category'
import { MinimalProduct } from '../models/MinimalProduct'
import { Product } from '../models/Product'
import { Store } from '../models/Store'
import { CustomResponse } from '../network/CustomResponse'
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
    @observable public store: Store = null
    @observable public products: Map<number, MinimalProduct> = new Map<number, MinimalProduct>()
    @observable public categories: Map<number, Category> = new Map<number, Category>()
    @observable public currentProduct: Product = null
    @observable public detectionState: DetectionState = 'NO_STORE_NO_BEACON'
    @observable public fetchData = fetchDataInitialValue

    private navHandler: INavigationHandler = null
    private beaconDetector: IBeaconDetector = null
    private beaconEngine: BeaconEngine = null
    private userId: string = null
    private socketManager: SocketManager = SocketManager.getInstance()

    public constructor() {
        this.navHandler = new NavigationHandler(this.detectionState)
        reaction(
            () => this.detectionState,
            () => this.navHandler.navigate(this.detectionState)
        )
        this.beaconDetector = new BeaconDetector()
        this.beaconEngine = new BeaconEngine(this.beaconDetector)

        this.socketManager.onConnect(this.onConnect)
        this.socketManager.onReconnect(this.onReconnect)
        this.socketManager.onDisconnect(this.onDisconnect)
        this.socketManager.onRegister(this.onRegister)
        this.socketManager.onStaticData(this.onStaticData)
        this.socketManager.onMajorChange(this.onMajorChange)
        this.socketManager.onMinorChange(this.onMinorChange)
        this.socketManager.onGetProducts(this.onGetProducts)

        this.beaconEngine.onMajorChange = this.emitMajorChange
        this.beaconEngine.onMinorChange = this.emitMinorChange
    }

    public init(): void {
        return this.beaconEngine.init()
    }

    public stopDetecting(): Promise<boolean> {
        return this.beaconEngine.stopDetecting()
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

    private onMajorChange = (response: CustomResponse) => {
        console.log('major from server', response)
        if (response.getData().store) {
            this.store = new Store(response.getData().store)
            console.log('this.store', this.store)
            this.detectionState = 'FOUND_STORE_NO_BEACON'
            console.log('state changed')
            // reset previous fetch data & fetched products
            this.fetchData = fetchDataInitialValue
            this.products = new Map<number, MinimalProduct>()
            // fetch first products
            this.emitMinimalProductFetch({ category: null })
            return
        }

        this.detectionState = 'NO_STORE_NO_BEACON'
        this.products = new Map<number, MinimalProduct>()
        console.log(`''''${this.detectionState}'''''`)
        setTimeout(() => {
            this.fetchData.minimalProductsOffset = null
            this.fetchData.category = null
            this.store = null
        }, 3000)
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
