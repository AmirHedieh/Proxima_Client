import { TextStandardization } from '../TextStandardization'

describe('TextStandardization', () => {
    it('transform numbers', () => {
        expect(TextStandardization.transformNumbers('١٢٣B ٣')).toEqual('123B 3')
    })
    it('transform arabic', () => {
        expect(TextStandardization.transformArabic('ئإڇ ڨ')).toEqual('یاچ ق')
    })
})
