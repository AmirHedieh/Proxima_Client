import { observable } from 'mobx'
import { Product } from '../models/Product'
import { CustomResponse } from '../network/CustomResponse'
import { HttpManager } from '../network/HttpManager'
import { SocketManager } from '../network/SocketManager'
import { UserIdStorage } from '../storage/UserIdStorage'
import { DetectionState } from '../Types'
import { RandomGenerator } from '../utils/RandomGenerator'
import { BeaconDetector, IBeaconDetector } from './BeaconDetector'
import { BeaconEngine } from './BeaconEngine'

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
                this.detectionState = 'NO_STORE_NO_BEACON'
                return
            }
            // change state to store found
        }
        this.beaconEngine.onMinorChange = async (minor) => {
            if (!minor) {
                this.detectionState = 'FOUND_STORE_NO_BEACON'
                return
            }
            // fetch product data corresponding to beacon with minor
            try {
                const response = await HttpManager.getInstance().getProduct({ product: minor })
                if (response.isSuccessful()) {
                    this.currentProduct = response.getData()
                    if (RandomGenerator.generateRandomNumber(1, 100) % 2 === 0) {
                        this.detectionState = 'FOUND_STORE_FOUND_BEACON'
                    } else {
                        this.detectionState = 'FOUND_STORE_NO_BEACON'
                    }
                    console.log('product set')
                }
            } catch (e) {
                console.log(e.message)
            }
        }
    }

    public async init(): Promise<boolean> {
        this.socketManager.onConnect(this.onConnect)
        this.socketManager.onReconnect(this.onReconnect)
        this.socketManager.onRegister(this.onRegister)
        this.socketManager.onCategory(this.onCategory)
        return this.beaconEngine.init()
    }

    private onConnect = async () => {
        console.log('connected')
        const userId = await UserIdStorage.get()
        console.log('userId: ', userId)
        if (userId) {
            // authorize
            console.log('authorize')
            this.socketManager.authorize({ id: Number(userId) })
        } else {
            console.log('registering')
            this.socketManager.register()
        }
    }

    private onRegister = async (response: CustomResponse) => {
        console.log('on register called', response)
        await UserIdStorage.set(response.getData().id)
    }

    private onCategory = (response: CustomResponse) => {
        for (const element of response.getData()) {
            this.categories.push(element)
        }
        console.log('categories', this.categories)
    }

    private onReconnect = () => {
        console.log('Reconnected')
    }

    private registerUser = async () => {
        const timerId = setInterval(async () => {
            const response = await HttpManager.getInstance().register()
            if (response.isSuccessful()) {
                await UserIdStorage.set(response.getData().userId)
                this.userId = response.getData().userId
                clearTimeout(timerId)
            }
        }, 2000)
    }
}
