import { action, computed } from 'mobx'
import { Product } from '../models/Product'
import { AppEngine } from './AppEngine'

export class DomainViewModel {
    private appEngine: AppEngine
    public constructor(appEngine: AppEngine) {
        this.appEngine = appEngine
    }

    public async init(): Promise<boolean> {
        return this.appEngine.init()
    }

    @action
    public addProduct(product: Product) {
        this.appEngine.products.set(product.id, product)
    }

    @computed
    public get getProductsLength() {
        // TODO: its optional and can be removed
        return this.appEngine.products.size
    }

    public getProductList() {
        return this.appEngine.products
    }

    public getCategoryList() {
        return this.appEngine.currentProduct
    }

    public getCurrentProduct() {
        return this.appEngine.currentProduct
    }

    public getDetectionState() {
        return this.appEngine.detectionState
    }

    public getStore() {
        return this.appEngine.store
    }
}
