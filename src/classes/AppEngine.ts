import { observable } from 'mobx'
import { EnvironmentVariables } from '../Constants'
import { Category } from '../models/Category'
import { MinimalProduct } from '../models/MinimalProduct'
import { Product } from '../models/Product'
import { Store } from '../models/Store'
import { CustomResponse } from '../network/CustomResponse'
import { SocketManager } from '../network/SocketManager'
import { UserIdStorage } from '../storage/UserIdStorage'
import { DetectionState } from '../Types'
import { BeaconDetector, IBeaconDetector } from './BeaconDetector'
import { BeaconEngine } from './BeaconEngine'
import { RandomGenerator } from '../utils/RandomGenerator'

export class AppEngine {
    @observable public store: Store = new Store({
        id: 1,
        name: 'نام فروشنده',
        information: 'اطلاعات فروشگاه',
        instagramContact: 'Instagram',
        whatsappContact: 'whatsapp',
        telegramContact: 'telegram',
        address: 'آدرس فروشگاه',
        phoneNumber: '09905226632',
        picture: 'https://i.picsum.photos/id/826/200/200.jpg'
    })
    @observable public products: Map<number, MinimalProduct> = new Map<number, MinimalProduct>()
    @observable public categories: Map<number, Category> = new Map<number, Category>()
    @observable public currentProduct: Product = new Product({
        id: 10,
        information: 'اطلاعات محصول',
        clothMaterial: 'مخمل',
        bodyMaterial: 'آهن',
        price: 10000,
        name: 'محصول عالی ۹ نفره',
        pictures: []
    })
    @observable public detectionState: DetectionState = 'FOUND_STORE_NO_BEACON'
    private beaconDetector: IBeaconDetector = null
    private beaconEngine: BeaconEngine = null
    private userId: string = null
    private socketManager: SocketManager = SocketManager.getInstance()
    private minimalProductFetchData = {
        offset: 0,
        category: null
    }

    public constructor() {
        this.beaconDetector = new BeaconDetector()
        this.beaconEngine = new BeaconEngine(this.beaconDetector)

        // this.socketManager.onConnect(this.onConnect)
        // this.socketManager.onReconnect(this.onReconnect)
        // this.socketManager.onDisconnect(this.onDisconnect)
        // this.socketManager.onRegister(this.onRegister)
        // this.socketManager.onStaticData(this.onStaticData)
        // this.socketManager.onMajorChange(this.onMajorChange)
        // this.socketManager.onMinorChange(this.onMinorChange)
        // this.socketManager.onGetProducts(this.onGetProducts)

        // this.beaconEngine.onMajorChange = this.emitMajorChange
        // this.beaconEngine.onMinorChange = this.emitMinorChange

        for (let i = 0; i < 15; i++) {
            const product = new MinimalProduct({
                id: RandomGenerator.generateRandomNumber(0, 1000),
                price: RandomGenerator.generateRandomNumber(0, 10000),
                name: `کالای ${RandomGenerator.generateRandomNumber(0, 100)}`,
                picture:
                    'https://cdn.zeplin.io/5ec7b8d67dec494ba300ad8f/assets/1723cc0a-9fd0-4b75-8c9c-8422beb77147.png'
            })
            this.products.set(product.id, product)
        }

        const mainOne = new Category({
            category: 1,
            parent: null,
            name: `اول`,
            children: [2]
        })
        const mainCat = new Category({
            category: 2,
            parent: 1,
            name: `دوم`,
            children: [3, 4, 5, 6, 7]
        })
        this.categories.set(mainOne.id, mainOne)
        this.categories.set(mainCat.id, mainCat)

        for (let i = 3; i < 3 + mainCat.children.length; i++) {
            const category = new Category({
                category: i,
                parent: mainCat.id,
                name: `دسته ${RandomGenerator.generateRandomNumber(0, 100)}`,
                children: []
            })
            this.categories.set(category.id, category)
        }
    }

    public init(): void {
        return this.beaconEngine.init()
    }

    public emitMinimalProductFetch = (params: { category: number }) => {
        if (params.category !== this.minimalProductFetchData.category) {
            this.minimalProductFetchData.offset = 0
            this.minimalProductFetchData.category = params.category
            this.products = new Map<number, MinimalProduct>()
        }
        this.socketManager.getProduct({
            category: params.category,
            offset: this.minimalProductFetchData.offset,
            limit: 10
        })
    }

    private emitMajorChange = (major) => {
        // console.log('major changed')
        this.socketManager.majorChange({ major })
        // change state to store found
    }

    private emitMinorChange = (minor) => {
        console.log('minor changed with: ', minor)
        this.socketManager.minorChange({ minor })
    }

    private onConnect = async () => {
        console.log('connected')
        const userId = await UserIdStorage.get()
        console.log('userId: ', userId)
        if (userId) {
            // authorize
            console.log('authorize')
            this.userId = userId
            this.socketManager.authorize({ id: userId })
        } else {
            console.log('registering')
            this.socketManager.register()
        }
    }

    private onReconnect = () => {
        console.log('Reconnected')
    }

    private onDisconnect = async () => {
        console.log('Disconnected')
        await this.beaconEngine.stopDetecting()
        console.log('stopped detecting')
    }

    private onRegister = async (response: CustomResponse) => {
        console.log('on register called', response)
        await UserIdStorage.set(response.getData().id)
        this.userId = response.getData().id
    }

    private onStaticData = async (response: CustomResponse) => {
        console.log(response)
        if (EnvironmentVariables.version !== response.getData().version) {
            console.log('app needs to update')
        }

        for (const element of response.getData().categories) {
            const category = new Category(element)
            this.categories.set(category.id, category)
        }
        console.log('categories', this.categories)

        await this.beaconEngine.startDetecting()
    }

    private onMajorChange = (response: CustomResponse) => {
        // console.log('on major', response)
        if (response.getData().store) {
            this.store = new Store(response.getData().store)
            this.detectionState = 'FOUND_STORE_NO_BEACON'
            this.emitMinimalProductFetch({ category: null })
            return
        }
        this.detectionState = 'NO_STORE_NO_BEACON'
        this.store = null
    }

    private onMinorChange = (response: CustomResponse) => {
        console.log('on minor', response)
        if (response.getData().product) {
            this.currentProduct = new Product(response.getData().product)
            this.detectionState = 'FOUND_STORE_FOUND_BEACON'
            return
        }
        this.detectionState = 'FOUND_STORE_NO_BEACON'
        this.currentProduct = null
    }

    private onGetProducts = (response: CustomResponse) => {
        console.log('fetched products', response.getData().products)
        for (const element of response.getData().products) {
            this.minimalProductOffset++
            const product = new MinimalProduct(element)
            this.products.set(product.id, product)
        }
    }
}
