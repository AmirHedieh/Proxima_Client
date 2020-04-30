import { observable } from 'mobx'
import { Product } from '../models/Product'
import { HttpManager } from '../network/HttpManager'
import { DetectionState } from '../Types'
import { BeaconDetector, IBeaconDetector } from './BeaconDetector'
import { BeaconEngine } from './BeaconEngine'

export class AppEngine {
    @observable public products: Product[] = []
    @observable public categories: any[] = [] // TODO: implement DTO
    @observable public currentProduct: Product = null
    @observable public detectionState: DetectionState
    private beaconDetector: IBeaconDetector = null
    private beaconEngine: BeaconEngine = null

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
