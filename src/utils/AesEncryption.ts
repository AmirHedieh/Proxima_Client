import { AES, enc } from 'crypto-js'

export class AesEncryption {

    public static encrypt(data: any): any {
        const cipherData = AES.encrypt(data, this.secretKey, { iv: this.iv })
        return cipherData.toString()
    }

    public static decrypt(cipherData: any) {
        const bytes = AES.decrypt(cipherData.toString(), this.secretKey, { iv: this.iv })
        const decryptedData = bytes.toString(enc.Utf8)
        return decryptedData
    }

    private static secretKey: string = enc.Base64.parse('Le5DgMTAAABANokdEAiasl')// length=32

    private static iv: string = enc.Base64.parse('poiFxENnZLbienLyANoitt') // length=32
}
