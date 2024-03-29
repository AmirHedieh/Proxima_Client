import { stores } from '../../mobx/RootStore'
import { Localization } from '../Localization'

describe('Localization', () => {
    it('translate english with arg', () => {
        expect(Localization.translate('test', ['moein'])).toEqual('Test moein')
    })
    it('translate english without arg', () => {
        expect(Localization.translate('test')).toEqual('Test $arg0')
    })
    it('translate persian with arg', () => {
        stores.UIState.setLanguage('fa')
        expect(Localization.translate('test', ['معین'])).toEqual('تست معین')
    })
    it('translate persian without arg', () => {
        stores.UIState.setLanguage('fa')
        expect(Localization.translate('test')).toEqual('تست $arg0')
    })
})
