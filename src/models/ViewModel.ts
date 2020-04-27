import { action, computed } from 'mobx'
import { AppEngine } from './AppEngine'
import { Product } from './Product'

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
        return this.appEngine.products.length
    }
}
