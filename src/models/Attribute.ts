import { CommonValidator } from "../utils/Validator"

interface IRawAttribute {
    id: number,
    title: string,
    description: string
}

interface IAttribute {
    id: number,
    title: string,
    description: string
}

export class Attribute implements IAttribute {
    public static keyExtractor(attribute: Attribute): string {
        return `key${attribute.id}`
    }

    public id: number
    public title: string
    public description: string

    constructor(rawProduct: IRawAttribute) {
        this.id = rawProduct.id
        this.description = rawProduct.title
        this.description = rawProduct.description
    }
}
