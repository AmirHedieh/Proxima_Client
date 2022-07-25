import { CommonValidator } from "../utils/Validator"
import { Attribute } from "./Attribute"

export interface IPicture {
    id: number,
    url: string,
    type_id: number
}
export interface IRawProduct {
    id: number
    name: string
    creator: string
    creation_time: string
    description: string
    beacon: string //fix
    attributes: Attribute[]
    pictures: IPicture[]
}

export interface IProduct {
    id: number
    name: string
    creator: string
    creationTime: string
    description: string
    beacon: string //fix
    attributes: Attribute[]
    pictures: IPicture[]
}
type ProductPictureType = 'owner' | 'user'

const ProductPictureType = {
    owner: 1,
    user: 2
}
export class Product implements IProduct {
    public static keyExtractor(product: Product): string {
        return String(product.id)
    }

    public static getPictureTypeId(type: ProductPictureType): number {
        if (type === 'owner') {
            return ProductPictureType.owner
        }
        return ProductPictureType.user
    }

    public static getPictureType(picture: IPicture): ProductPictureType {
        if (picture.type_id === ProductPictureType.owner) {
            return 'owner'
        }
        return 'user'
    }

    public id: number
    public name: string
    public creator: string
    public creationTime: string
    public description: string
    public beacon: string //fix
    public attributes: Attribute[]
    public pictures: IPicture[]

    constructor(rawProduct: IRawProduct) {
        this.id = rawProduct.id
        this.name = rawProduct.name
        this.creator = rawProduct.creator
        this.creationTime = rawProduct.creation_time
        this.description = rawProduct.description
        this.beacon = rawProduct.beacon
        this.pictures = rawProduct.pictures
        this.attributes = rawProduct.attributes
        this.pictures = rawProduct.pictures
    }

    public ownerPictures(): IPicture[] {
        if (CommonValidator.isEmptyArray(this.pictures)) {
            return []
        }
        return this.pictures.filter((element: IPicture) => element.type_id === Product.getPictureTypeId('owner'))
    }
    public userPictures(): IPicture[] {
        if (CommonValidator.isEmptyArray(this.pictures)) {
            return []
        }
        return this.pictures.filter((element: IPicture) => element.type_id === Product.getPictureTypeId('user'))
    }
}
