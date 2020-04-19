import { CommonValidator , ProfileValidator } from '../Validator'

describe('Validator.isArray', () => {
    it('empty array', () => {
        expect(CommonValidator.isArray([])).toEqual(true)
    })
    it('filled array', () => {
        expect(CommonValidator.isArray([1, 2])).toEqual(true)
    })
    it('null', () => {
        expect(CommonValidator.isArray(null)).toEqual(false)
    })
})

describe('Validator.isEmptyArray', () => {
    it('empty array', () => {
        expect(CommonValidator.isEmptyArray([])).toEqual(true)
    })
    it('filled array', () => {
        expect(CommonValidator.isEmptyArray([1, 2])).toEqual(false)
    })
    it('null', () => {
        expect(CommonValidator.isEmptyArray(null)).toEqual(false)
    })
})

describe('Validator.isNullOrEmpty', () => {
    it('not null or empty string', () => {
        expect(CommonValidator.isNullOrEmpty('test')).toEqual(false)
    })
    it('empty string', () => {
        expect(CommonValidator.isNullOrEmpty('')).toEqual(true)
    })
    it('null value', () => {
        expect(CommonValidator.isNullOrEmpty(null)).toEqual(true)
    })
})

describe('Validator.isNumber', () => {
    it('a number', () => {
        expect(CommonValidator.isNumber(1)).toEqual(true)
    })
    it('not a number', () => {
        expect(CommonValidator.isNumber('hey!')).toEqual(false)
    })
    it('null value', () => {
        expect(CommonValidator.isNumber(null)).toEqual(false)
    })
})

describe('Validator.isZeroOrEmptyNumber', () => {
    it('zero', () => {
        expect(CommonValidator.isZeroOrEmptyNumber(0)).toEqual(true)
    })
    it('not zero', () => {
        expect(CommonValidator.isZeroOrEmptyNumber(1)).toEqual(false)
    })
    it('null value', () => {
        expect(CommonValidator.isZeroOrEmptyNumber(null)).toEqual(true)
    })
})

describe('Validator.IsPhoneNumber', () => {
    it('Less Length', () => {
        expect(ProfileValidator.isPhoneNumber('123456789')).toEqual(false)
    })
    it('More length', () => {
        expect(ProfileValidator.isPhoneNumber('123456789123')).toEqual(false)
    })
    it('null value', () => {
        expect(ProfileValidator.isPhoneNumber(null)).toEqual(false)
    })
    it('empty', () => {
        expect(ProfileValidator.isPhoneNumber('')).toEqual(false)
    })
    it('word', () => {
        expect(ProfileValidator.isPhoneNumber('1234567891w')).toEqual(false)
    })
    it('invalid phone', () => {
        expect(ProfileValidator.isPhoneNumber('12345678912')).toEqual(false)
    })

    it('invalid phone 2', () => {
        expect(ProfileValidator.isPhoneNumber('02345678912')).toEqual(false)
    })

    it('valid phone', () => {
        expect(ProfileValidator.isPhoneNumber('09345678912')).toEqual(true)
    })

})

describe('Validator.IsPassword', () => {
    it('Less Length', () => {
        expect(ProfileValidator.isPassword('1a3')).toEqual(false)
    })
    it('More length', () => {
        expect(ProfileValidator.isPassword('123456789123456789123456789123456789asdqw')).toEqual(false)
    })
    it('null value', () => {
        expect(ProfileValidator.isPassword(null)).toEqual(false)
    })
    it('empty', () => {
        expect(ProfileValidator.isPassword('')).toEqual(false)
    })
    it('without word', () => {
        expect(ProfileValidator.isPassword('123456789')).toEqual(false)
    })
    it('without number', () => {
        expect(ProfileValidator.isPassword('abcdefghijk')).toEqual(false)
    })

    it('valid', () => {
        expect(ProfileValidator.isPassword('123456abcdefghijk')).toEqual(true)
    })
    it('valid2', () => {
        expect(ProfileValidator.isPassword('1234567q')).toEqual(true)
    })
})
