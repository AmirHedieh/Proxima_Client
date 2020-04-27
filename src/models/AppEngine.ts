import { observable } from 'mobx'
import { BeaconDetector, IBeaconDetector } from './BeaconDetector'
import { BeaconEngine } from './BeaconEngine'
import { Product } from './Product'
export class AppEngine {
    @observable public products: Product[] = []
    @observable public categories: any[] = [] // TODO: implement DTO
    @observable public currentProduct: Product = null
    private beaconDetector: IBeaconDetector = null
    private beaconEngine: BeaconEngine = null
    public constructor() {
        this.beaconDetector = new BeaconDetector()
        this.beaconEngine = new BeaconEngine(this.beaconDetector)
        this.beaconEngine.onMajorChange = (major) => {
            console.log(this.products)
        }
    }
    public async init(): Promise<boolean> {
        return this.beaconEngine.init()
    }
}
