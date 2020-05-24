import { observable } from 'mobx'
import { LocalizationLanguages } from '../Types'

export class UiStore {
    @observable public language: LocalizationLanguages = 'fa'
}
