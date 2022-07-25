export interface ISocketNetworkPromise {
    status: {
        code: number
        message: string
    }
    result?: any
}
export interface IHttpNetworkPromise {
    data: {
        status: {
            code: number
            message: string
        }
        result?: any
    }
}

export type IResolve = (value: ISocketNetworkPromise) => void
