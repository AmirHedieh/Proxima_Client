import { observable } from 'mobx'
import { Product } from '../models/Product'
import { CustomResponse } from '../network/CustomResponse'
import { HttpManager } from '../network/HttpManager'
import { SocketManager } from '../network/SocketManager'
import { UserIdStorage } from '../storage/UserIdStorage'
import { VersionStorage } from '../storage/VersionStorage'
import { DetectionState } from '../Types'
import { RandomGenerator } from '../utils/RandomGenerator'
import { BeaconDetector, IBeaconDetector } from './BeaconDetector'
import { BeaconEngine } from './BeaconEngine'
import { Category } from '../models/Category'

export class AppEngine {
    @observable public products: Product[] = []
    @observable public categories: any[] = [] // TODO: implement DTO
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
            if (!major) {
                this.socketManager.majorChange({ major })
                this.detectionState = 'NO_STORE_NO_BEACON'
                return
            }
            // change state to store found
        }
        this.beaconEngine.onMinorChange = async (minor) => {
            console.log('minor change')
            if (!minor) {
                this.socketManager.minorChange({ minor })
                this.detectionState = 'FOUND_STORE_NO_BEACON'
                return
            }
        }
    }

    public async init(): Promise<boolean> {
        this.socketManager.onConnect(this.onConnect)
        this.socketManager.onMajorChange(this.onMajorChange)
        this.socketManager.onMinorChange(this.onMinorChange)
        this.socketManager.onReconnect(this.onReconnect)
        this.socketManager.onRegister(this.onRegister)
        this.socketManager.onCategories(this.onCategories)
        this.socketManager.onVersion(this.onVersion)
        this.socketManager.onGetProduct(this.onGetProduct)
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

    private onMajorChange = (response: CustomResponse) => {
        console.log('major', response)
    }

    private onMinorChange = (response: CustomResponse) => {
        console.log('minor', response)
    }

    private onRegister = async (response: CustomResponse) => {
        console.log('on register called', response)
        await UserIdStorage.set(response.getData().id)
        this.userId = response.getData().id
    }

    private onCategories = (response: CustomResponse) => {
        for (const element of response.getData().categories) {
            this.categories.push(new Category(element))
        }
        console.log('categories', this.categories)
    }

    private onVersion = async (response: CustomResponse) => {
        const version = await VersionStorage.get()
        if (version !== response.getData().version) {
            // update app
            await VersionStorage.set(response.getData().version)
        }
        console.log(response)
    }
    private onReconnect = () => {
        console.log('Reconnected')
    }

    private onGetProduct = (response: CustomResponse) => {
        const products: Product[] = []
        for (const element of response.getData().products) {
            products.push(new Product(element))
        }
        this.products = products
    }
}
