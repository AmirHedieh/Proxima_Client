export interface IRawProduct {
    product: number
    name: string
    info: string
    price: number
    bodyMaterial: string
    clothMaterial: string
    picture: string[]
    active: boolean
    category: number
}

export class Product {
    public static keyExtractor(product: Product): string {
        return String(product.id)
    }

    public id: number
    public productName: string
    public info: string
    public price: number
    public bodyMaterial: string
    public clothMaterial: string
    public picture: string[]
    public category: number

    constructor(rawProduct: IRawProduct) {
        this.id = rawProduct.product
        this.productName = rawProduct.name
        this.info = rawProduct.info
        this.price = rawProduct.price
        this.bodyMaterial = rawProduct.bodyMaterial
        this.clothMaterial = rawProduct.clothMaterial
        this.picture = rawProduct.picture
        this.category = rawProduct.category
    }
}
