import { axiosFactory } from '../network/AxiosWrapper'
import { CustomResponse } from './CustomResponse'

export class HttpManager {
    public static getInstance(): HttpManager {
        if (HttpManager.instance == null) {
            HttpManager.instance = new HttpManager()
        }
        return HttpManager.instance
    }

    private static instance: HttpManager = null
    private axiosWithToken = axiosFactory('withToken')
    private axiosNoToken = axiosFactory('noToken')
    private axiosFileUploader = axiosFactory('fileUpload')

    /* example
    public phoneNumberSubmit = async (data: {
        phoneNumber: string
    }): Promise<CustomResponse> => {
        return new CustomResponse(await this.axiosNoToken.post('v1.0/client/user/account', {
            number: data.phoneNumber
        }))
    }
    */
}
