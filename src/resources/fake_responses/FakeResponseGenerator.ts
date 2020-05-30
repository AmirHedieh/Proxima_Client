import { Product } from '../../models/Product'
import { INetworkPromise } from '../../network/IHttpManager'

export class FakeResponseGenerator {
    public static getProduct(product: number): INetworkPromise {
        return {
            data: {
                status: {
                    code: 1,
                    message: 'success'
                },
                result: new Product({
                    name: 'Product',
                    minimalInfo: 'Minimal Info',
                    information: 'Complete info',
                    price: product * 1000,
                    bodyMaterial: 'bodyMaterial',
                    clothMaterial: 'clothMaterial',
                    pictures: []
                })
            }
        }
    }
    public static register(): INetworkPromise {
        return {
            data: {
                status: {
                    code: 1,
                    message: 'success'
                },
                result: {
                    userId: 'fakeUserId'
                }
            }
        }
    }
}
