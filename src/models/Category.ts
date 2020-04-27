export interface IRawCategory {
    id: number
    name: string
}

export class Category {
    public objectId: number
    public name: string
    public constructor(rawCategory: IRawCategory) {
        this.objectId = rawCategory.id
        this.name = rawCategory.name
    }
}
