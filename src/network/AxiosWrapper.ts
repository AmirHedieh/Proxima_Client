import axios from 'axios'
import { NetworkConfig } from '../Constants'

type IType = 'withToken' | 'noToken' | 'fileUpload' | 'mapSearch'
export class AxiosWrapper {
    private instance = null
    constructor(options: any) {
        this.instance = axios.create(options)
    }
    public get(url: string, data?) {
        return this.instance.get(url, { params: data })
    }
    public post(url: string, data: any) {
        return this.instance.post(url, data)
    }
    public put(url: string, data: any) {
        return this.instance.put(url, data)
    }
    public delete(url: string, data: any) {
        return this.instance.delete(url, { params: data })
    }
}

export const axiosFactory = (type: IType) => {
    const baseOption = {
        baseURL: NetworkConfig.apiBaseUrl,
        timeout: NetworkConfig.httpRequestTimeout,
        headers: {
            'Authorization': null,
            'Content-Type': 'application/json'
        }
    }
    switch (type) {
        case 'withToken':
            // TODO: set token
            baseOption.headers.Authorization = `Bearer ${null}`
            return new AxiosWrapper(baseOption)
        case 'noToken':
            return new AxiosWrapper(baseOption)
        case 'fileUpload':
            baseOption.headers['Content-Type'] = 'multipart/form-data'
            return new AxiosWrapper(baseOption)
        case 'mapSearch':
            baseOption.baseURL = null
            baseOption.headers.Authorization = null
            // tslint:disable-next-line: max-line-length
            baseOption.headers['x-api-key'] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6ImZmMzNiN2JmYjliMThmNjg5YzYzOGRkOThhYzg2NWE4MzhhYjM3OWFjNTk0OWU0NzI4MWJkODYwMmNlMGFlMDU2ZjcwMjE1Yzc3ODI2YjA3In0.eyJhdWQiOiI3OTYzIiwianRpIjoiZmYzM2I3YmZiOWIxOGY2ODljNjM4ZGQ5OGFjODY1YTgzOGFiMzc5YWM1OTQ5ZTQ3MjgxYmQ4NjAyY2UwYWUwNTZmNzAyMTVjNzc4MjZiMDciLCJpYXQiOjE1ODE4NzExODksIm5iZiI6MTU4MTg3MTE4OSwiZXhwIjoxNTg0Mzc2Nzg5LCJzdWIiOiIiLCJzY29wZXMiOlsiYmFzaWMiXX0.C9_Qtnb7Y0mncekp8a2JIrqKOfGjVcwG9WaJOzmaWuhWNpDlrzgCUL86qCOxl47lzkNAqmao_u9NdsvBsQfP_9UbyEWf23nRukgxAR3c7UKn3V-ZT2hoA7faor6QLI2OtUEEO5jbakKZW4dkee0I66PbL3BYF3eYPWQdplhP3sNp0wrhPy9Ebc4p_QiC6M_WKvTo1uOfauZONJB_rM1fpqo4cG6Lrcv8aPkny1-Qibo3A2kkzGUofIVlADZWw0_CxWzqJ7DksDZzphMNpU7wSOxg6FizY2fxt8UaV10cFdpqmjhvl3tHU0tEevAfy1XWOB-vqfo0UAtlBelINb8Odg'
            return new AxiosWrapper(baseOption)
        default:
            return null
    }
}
