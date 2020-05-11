interface IRawMinimalProduct {
    product: number
    name: string
    picture: string
    price: number
}
export class MinimalProduct {
    public id: number
    public name: string
    public picture: string
    public price: number

    public constructor(rawMinimalProduct: IRawMinimalProduct) {
        this.id = rawMinimalProduct.product
        this.name = rawMinimalProduct.name
        this.picture = rawMinimalProduct.picture
        this.price = rawMinimalProduct.price
    }
}
