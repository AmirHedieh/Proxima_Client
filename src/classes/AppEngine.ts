import { observable } from 'mobx'
import { EnvironmentVariables } from '../Constants'
import { Category } from '../models/Category'
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
    @observable public products: Map<number, Product> = new Map<number, Product>()
    @observable public categories: Map<number, Category> = new Map<number, Category>()
    @observable public currentProduct: Product = null
    @observable public detectionState: DetectionState = 'NO_STORE_NO_BEACON'
    private beaconDetector: IBeaconDetector = null
    private beaconEngine: BeaconEngine = null
    private userId: string = null
    private socketManager: SocketManager = SocketManager.getInstance()

    public constructor() {
        this.beaconDetector = new BeaconDetector()
        this.beaconEngine = new BeaconEngine(this.beaconDetector)

        this.socketManager.onConnect(this.onConnect)
        this.socketManager.onReconnect(this.onReconnect)
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

    private emitMajorChange = (major) => {
        if (!major) {
            this.store = null
            this.detectionState = 'NO_STORE_NO_BEACON'
            return
        }
        console.log('major changed')
        this.socketManager.majorChange({ major })
        this.detectionState = 'FOUND_STORE_NO_BEACON'
        // change state to store found
    }

    private emitMinorChange = (minor) => {
        console.log('minor changed')
        if (!minor) {
            this.socketManager.minorChange({ minor })
            this.detectionState = 'FOUND_STORE_NO_BEACON'
            return
        }
        this.detectionState = 'FOUND_STORE_FOUND_BEACON'
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

    private onRegister = async (response: CustomResponse) => {
        console.log('on register called', response)
        await UserIdStorage.set(response.getData().id)
        this.userId = response.getData().id
    }

    private onStaticData = async (response: CustomResponse) => {
        // if (EnvironmentVariables.version !== response.getData().version) {
        //     // update app
        //     return
        // }
        // console.log('app is up-to-date')

        // for (const element of response.getData().categories) {
        //     const category = new Category(element)
        //     this.categories.set(category.id, category)
        // }
        // console.log('categories', this.categories)

        await this.beaconEngine.startDetecting()
    }

    private onMajorChange = (response: CustomResponse) => {
        console.log('on major', response)
        this.store = new Store(response.getData().store)
    }

    private onMinorChange = (response: CustomResponse) => {
        console.log('on minor', response)
        this.currentProduct = new Product(response.getData().product)
    }

    private onGetProducts = (response: CustomResponse) => {
        for (const element of response.getData().products) {
            const product = new Product(element)
            this.products.set(product.id, product)
        }
    }
}
