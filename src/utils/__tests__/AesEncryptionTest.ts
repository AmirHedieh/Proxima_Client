import { AesEncryption } from '../AesEncryption'

describe('Encryption', () => {
    it('Different encrypted', () => {
        const encrypted1 = AesEncryption.encrypt('test1')
        const encrypted2 = AesEncryption.encrypt('test2')
        expect(encrypted1).not.toEqual(encrypted2)
    })
    it('null encrypted', () => {
        const encrypted = AesEncryption.encrypt('test')
        expect(encrypted).not.toEqual(null)
    })
    it('empty string', () => {
        const encrypted = AesEncryption.encrypt('test1')
        expect(encrypted).not.toEqual('')
    })
})

describe('Encryption and Decryption', () => {
    it('Different', () => {
        const encrypted1 = AesEncryption.encrypt('Test1')
        const encrypted2 = AesEncryption.encrypt('Test2')
        expect(AesEncryption.decrypt(encrypted1)).not.toEqual(AesEncryption.decrypt(encrypted2))
    })

    it('empty', () => {
        const encrypted = AesEncryption.encrypt('Test')
        expect(AesEncryption.decrypt(encrypted)).not.toEqual('')
    })

    it('Equal', () => {
        const encrypted = AesEncryption.encrypt('Test')
        expect(AesEncryption.decrypt(encrypted)).toEqual('Test')
    })
})
