import { IHttpNetworkPromise, ISocketNetworkPromise } from './IHttpManager'

import { StatusCodes } from './NetworkConstants'

export class CustomResponse {
    private code
    private message
    private data

    constructor(response: ISocketNetworkPromise | IHttpNetworkPromise) {
        if (this.isHttpResponse(response)) {
            this.code = response.data.status.code
            this.message = response.data.status.message
            this.data = response.data.result
        } else {
            this.code = response.status.code
            this.message = response.status.message
            this.data = response.result
        }
    }

    public isSuccessful() {
        return this.code === StatusCodes.Backend.success
    }
    public getCode() {
        return this.code
    }
    public getMessage() {
        return this.message
    }
    public getData() {
        return this.data
    }

    private isHttpResponse(response: ISocketNetworkPromise | IHttpNetworkPromise): response is IHttpNetworkPromise {
        return (response as IHttpNetworkPromise).data != null
    }
}
