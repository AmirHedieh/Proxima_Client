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
    @observable public products: Product[] = []
    @observable public categories: Category[] = []
    @observable public currentProduct: Product = null
    @observable public detectionState: DetectionState = 'NO_STORE_NO_BEACON'
    private beaconDetector: IBeaconDetector = null
    private beaconEngine: BeaconEngine = null
    private userId: string = null
    private socketManager: SocketManager = SocketManager.getInstance()

    public constructor() {
        this.beaconDetector = new BeaconDetector()
        this.beaconEngine = new BeaconEngine(this.beaconDetector)
        this.beaconEngine.onMajorChange = (major) => {
            console.log('major changed')
            if (!major) {
                this.socketManager.majorChange({ major })
                this.detectionState = 'NO_STORE_NO_BEACON'
                return
            }
            this.detectionState = 'FOUND_STORE_NO_BEACON'
            // change state to store found
        }
        this.beaconEngine.onMinorChange = async (minor) => {
            console.log('minor changed')
            if (!minor) {
                this.socketManager.minorChange({ minor })
                this.detectionState = 'FOUND_STORE_NO_BEACON'
                return
            }
            this.detectionState = 'FOUND_STORE_FOUND_BEACON'
        }
    }

    public async init(): Promise<boolean> {
        this.socketManager.onConnect(this.onConnect)
        this.socketManager.onReconnect(this.onReconnect)
        this.socketManager.onRegister(this.onRegister)
        this.socketManager.onVersion(this.onVersion)
        this.socketManager.onCategories(this.onCategories)
        this.socketManager.onMajorChange(this.onMajorChange)
        this.socketManager.onMinorChange(this.onMinorChange)
        this.socketManager.onGetProducts(this.onGetProducts)
        return this.beaconEngine.init()
    }

    private onConnect = async () => {
        console.log('connected')
        const userId = await UserIdStorage.get()
        console.log('userId: ', userId)
        if (userId) {
            // authorize
            console.log('authorize')
            this.userId = userId
            this.socketManager.authorize({ id: Number(userId) })
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

    private onVersion = async (response: CustomResponse) => {
        if (EnvironmentVariables.version !== response.getData().version) {
            // update app
            return
        }
        console.log('app is up-to-date')
    }

    private onCategories = (response: CustomResponse) => {
        console.log(response)
        for (const element of response.getData().categories) {
            this.categories.push(new Category(element))
        }
        console.log('categories', this.categories)
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
        const products: Product[] = []
        for (const element of response.getData().products) {
            products.push(new Product(element))
        }
        this.products = products
    }
}
