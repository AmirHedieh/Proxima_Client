import {CommonValidator} from '../Validator'

describe('Validator.isPersian', () => {
    it('null', () => {
        expect(CommonValidator.isPersian(null)).toEqual(false)
    })
    it('persian', () => {
        expect(CommonValidator.isPersian('ا')).toEqual(true)
    })
    it('english', () => {
        expect(CommonValidator.isPersian('a')).toEqual(false)
    })
    it('arabic', () => {
        expect(CommonValidator.isPersian('ڇ')).toEqual(false)
    })
})
