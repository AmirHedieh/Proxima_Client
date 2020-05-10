import { INetworkPromise } from './IHttpManager'
import { StatusCodes } from './NetworkConstants'

export class CustomResponse {
    private code
    private message
    private data

    constructor(response: INetworkPromise) {
        this.code = response.status.code
        this.message = response.status.message
        this.data = response.result
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
}
