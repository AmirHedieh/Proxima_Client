import { action, computed } from 'mobx'
import { MinimalProduct } from '../models/MinimalProduct'
import { DetectionState } from '../Types'
import { AppEngine } from './AppEngine'

export class DomainViewModel {
    private appEngine: AppEngine
    public constructor(appEngine: AppEngine) {
        this.appEngine = appEngine
    }

    public init(): void {
        return this.appEngine.init()
    }

    @action
    public addProduct(product: MinimalProduct) {
        this.appEngine.products.set(product.id, product)
    }

    @action
    public fetchProducts = (params: { category: number }) => {
        this.appEngine.emitMinimalProductFetch(params)
    }

    @computed
    public get getProductsLength() {
        // TODO: its optional and can be removed
        return this.appEngine.products.size
    }

    public startDetecting() {
        return this.appEngine.startDetecting()
    }

    public stopDetecting() {
        return this.appEngine.stopDetecting()
    }

    public resetMinor(): void {
        return this.appEngine.resetMinor()
    }

    public getBeacons() {
        return this.appEngine.beacons
    }

    public getProductList() {
        return this.appEngine.products
    }

    public getCategoryList() {
        return this.appEngine.categories
    }

    public getCurrentProduct() {
        return this.appEngine.currentProduct
    }

    public getDetectionState(): DetectionState {
        return this.appEngine.detectionState
    }

    public getStore() {
        return this.appEngine.store
    }

    // to be used in infinite scroll
    public getFetchData() {
        return this.appEngine.fetchData
    }
}
