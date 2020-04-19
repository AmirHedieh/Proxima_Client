export interface IPromise {
    data: {
        status: {
            code: number,
            message: string
        },
        result?: any
    }
}

export type IResolve = (value: IPromise) => void
