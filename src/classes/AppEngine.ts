import { observable } from 'mobx'
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

export class AppEngine {
    @observable public store: Store = null
    @observable public products: Map<number, MinimalProduct> = new Map<number, MinimalProduct>()
    @observable public categories: Map<number, Category> = new Map<number, Category>()
    @observable public currentProduct: Product = null
    @observable public detectionState: DetectionState = 'NO_STORE_NO_BEACON'
    private beaconDetector: IBeaconDetector = null
    private beaconEngine: BeaconEngine = null
    private userId: string = null
    private socketManager: SocketManager = SocketManager.getInstance()
    private minimalProductOffset: number = 0

    public constructor() {
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

    public emitMinimalProductFetch = (params: { category: number }) => {
        console.log('emitting fetch product')
        this.socketManager.getProduct({
            category: params.category,
            offset: this.minimalProductOffset,
            limit: 10
        })
    }

    private emitMajorChange = (major) => {
        console.log('major changed')
        this.socketManager.majorChange({ major })
        // change state to store found
    }

    private emitMinorChange = (minor) => {
        // console.log('minor changed')
        this.socketManager.minorChange({ minor })
    }

    private onConnect = async () => {
        console.log('connected')
        const userId = await UserIdStorage.get()
        console.log('userId: ', userId)
        if (userId) {
            // authorize
            console.log('authorize')
            this.userId = userId
            this.socketManager.authorize({ id: userId })
        } else {
            console.log('registering')
            this.socketManager.register()
        }
    }

    private onReconnect = () => {
        console.log('Reconnected')
    }

    private onDisconnect = async () => {
        console.log('Disconnected')
        await this.beaconEngine.stopDetecting()
        console.log('stopped detecting')
    }

    private onRegister = async (response: CustomResponse) => {
        console.log('on register called', response)
        await UserIdStorage.set(response.getData().id)
        this.userId = response.getData().id
    }

    private onStaticData = async (response: CustomResponse) => {
        console.log(response)
        if (EnvironmentVariables.version !== response.getData().version) {
            console.log('app needs to update')
        }

        for (const element of response.getData().categories) {
            const category = new Category(element)
            this.categories.set(category.id, category)
        }
        console.log('categories', this.categories)

        await this.beaconEngine.startDetecting()
    }

    private onMajorChange = (response: CustomResponse) => {
        console.log('on major', response)
        if (response.getData().store) {
            this.store = new Store(response.getData().store)
            this.detectionState = 'FOUND_STORE_NO_BEACON'
            this.emitMinimalProductFetch({ category: null })
            return
        }
        this.store = null
        this.detectionState = 'NO_STORE_NO_BEACON'
    }

    private onMinorChange = (response: CustomResponse) => {
        console.log('on minor', response)
        if (response.getData().product) {
            this.currentProduct = new Product(response.getData().product)
            this.detectionState = 'FOUND_STORE_FOUND_BEACON'
            return
        }
        this.currentProduct = null
        this.detectionState = 'FOUND_STORE_NO_BEACON'
    }

    private onGetProducts = (response: CustomResponse) => {
        console.log('fetched products', response.getData().products)
        for (const element of response.getData().products) {
            this.minimalProductOffset++
            const product = new MinimalProduct(element)
            this.products.set(product.id, product)
        }
    }
}
