import { autorun, observable } from 'mobx'
import { Product } from '../models/Product'
import { HttpManager } from '../network/HttpManager'
import { DetectionState } from '../Types'
import { BeaconDetector, IBeaconDetector } from './BeaconDetector'
import { BeaconEngine } from './BeaconEngine'
import { INavigationHandler, NavigationHandler } from './NavigationHandler'
import { RandomGenerator } from '../utils/RandomGenerator'

export class AppEngine {
    @observable public products: Product[] = []
    @observable public categories: any[] = [] // TODO: implement DTO
    @observable public currentProduct: Product = null
    @observable public detectionState: DetectionState = 'NO_STORE_NO_BEACON'
    private beaconDetector: IBeaconDetector = null
    private beaconEngine: BeaconEngine = null
    private navHandler: INavigationHandler = null

    public constructor() {
        this.navHandler = new NavigationHandler()
        // will be called just when detectionState changes not any other observable
        autorun(() => this.navHandler.navigate(this.detectionState))
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
        return this.beaconEngine.init()
    }
}
