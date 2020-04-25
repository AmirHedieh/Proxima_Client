export interface IRawProduct {
    name: string
    minimalInfo: string
    info: string
    price: number
    bodyMaterial: string
    clothMaterial: string
    picture: string[]
}

export class Product {
    public name: string
    public minimalInfo: string
    public info: string
    public price: number
    public bodyMaterial: string
    public clothMaterial: string
    public picture: string[]
    constructor(rawProduct: IRawProduct) {
        this.name = rawProduct.name
        this.minimalInfo = rawProduct.minimalInfo
        this.info = rawProduct.info
        this.price = rawProduct.price
        this.bodyMaterial = rawProduct.bodyMaterial
        this.clothMaterial = rawProduct.clothMaterial
        this.picture = rawProduct.picture
    }
}
