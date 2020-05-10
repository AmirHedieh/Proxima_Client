import { observable } from 'mobx'
import { Product } from '../models/Product'
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
            // console.log('store changed')
        }
        this.beaconEngine.onMinorChange = async (minor) => {
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
        return this.beaconEngine.init()
    }

    private onConnect = () => {
        console.log('connected')
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
