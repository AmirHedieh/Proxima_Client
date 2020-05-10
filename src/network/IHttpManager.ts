export interface INetworkPromise {
    status: {
        code: number
        message: string
    }
    result?: any
}

export type IResolve = (value: INetworkPromise) => void
