export interface IRawCategory {
    category: number
    name: string
    children: number[]
}

export class Category {
    public id: number
    public name: string
    public children: number[]
    public constructor(rawCategory: IRawCategory) {
        this.id = rawCategory.category
        this.name = rawCategory.name
        this.children = rawCategory.children
    }
}
