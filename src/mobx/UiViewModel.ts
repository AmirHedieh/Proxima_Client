import { action } from 'mobx'
import { LocalizationLanguages } from '../Types'
import { UiStore } from './UiStore'
export class UiViewModel {
    private uiStore: UiStore

    public constructor(uiStore: UiStore) {
        this.uiStore = uiStore
    }

    @action
    public changeLanguage(language: LocalizationLanguages) {
        this.uiStore.language = language
    }

    public getLanguage(): LocalizationLanguages {
        return this.uiStore.language
    }
}
