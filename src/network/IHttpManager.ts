export interface INetworkPromise {
    data: {
        status: {
            code: number
            message: string
        }
        result?: any
    }
}

export type IResolve = (value: INetworkPromise) => void
