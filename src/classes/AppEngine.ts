import { autorun, observable } from 'mobx'
import { Product } from '../models/Product'
import { HttpManager } from '../network/HttpManager'
import { DetectionState } from '../Types'
import { BeaconDetector, IBeaconDetector } from './BeaconDetector'
import { BeaconEngine } from './BeaconEngine'
import { INavigationHandler, NavigationHandler } from './NavigationHandler'

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
                    this.detectionState = 'FOUND_STORE_FOUND_BEACON'
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
