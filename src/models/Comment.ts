export interface IRawComment {
    id: number
    commentor: string
    text: string
    product_id: number
}

export interface IComment {
    id: number
    commentor: string
    text: string
    productId: number
}
export class Comment implements IComment {
    public static keyExtractor(comment: Comment): string {
        return String(comment.id)
    }

    public id: number
    public commentor: string
    public text: string
    public productId: number

    public constructor(rawComment: IRawComment) {
        this.id = rawComment.id
        this.commentor = rawComment.commentor
        this.text = rawComment.text
        this.productId = rawComment.product_id
    }
}
