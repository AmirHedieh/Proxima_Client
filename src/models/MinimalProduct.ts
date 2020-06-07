export interface IRawMinimalProduct {
    id: number
    name: string
    picture: string
    price: number
}

export interface IMinimalProduct {
    id: number
    productName: string
    picture: string
    price: number
}
export class MinimalProduct implements IMinimalProduct {
    public static keyExtractor(product: MinimalProduct): string {
        return String(product.id)
    }

    public id: number
    public productName: string
    public picture: string
    public price: number

    public constructor(rawMinimalProduct: IRawMinimalProduct) {
        this.id = rawMinimalProduct.id
        this.productName = rawMinimalProduct.name
        this.picture = rawMinimalProduct.picture
        this.price = rawMinimalProduct.price
    }
}
