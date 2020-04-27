import { action, computed } from 'mobx'
import { Product } from '../models/Product'
import { AppEngine } from './AppEngine'

export class ViewModel {
    private appEngine: AppEngine
    public constructor(appEngine: AppEngine) {
        this.appEngine = appEngine
    }

    public async init(): Promise<boolean> {
        return this.appEngine.init()
    }

    @action
    public addProduct(product: Product) {
        this.appEngine.products.push(product)
    }
    @computed
    public get getProductsLength() {
        // TODO: its optional and can be removed
        return this.appEngine.products.length
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
}
