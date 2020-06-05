export interface IRawCategory {
    id: number
    parent: number
    name: string
    children: number[]
}

export class Category {
    public id: number
    public parent: number
    public name: string
    public children: number[]
    public constructor(rawCategory: IRawCategory) {
        this.id = rawCategory.id
        this.parent = rawCategory.parent
        this.name = rawCategory.name
        this.children = rawCategory.children
    }
}
