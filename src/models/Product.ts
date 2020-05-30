export interface IRawProduct {
    id: number
    name: string
    information: string
    price: number
    bodyMaterial: string
    clothMaterial: string
    pictures: string[]
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
        this.id = rawProduct.id
        this.productName = rawProduct.name
        this.info = rawProduct.information
        this.price = rawProduct.price
        this.bodyMaterial = rawProduct.bodyMaterial
        this.clothMaterial = rawProduct.clothMaterial
        this.picture = rawProduct.pictures
    }
}
