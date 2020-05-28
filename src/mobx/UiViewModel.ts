import { action } from 'mobx'
import { LocalizationLanguages } from '../Types'
import { UiStore } from './UiStore'
export class UiViewModel {
    private uiStore: UiStore

    public constructor(uiStore: UiStore) {
        this.uiStore = uiStore
    }

    @action
    public setLanguage(language: LocalizationLanguages) {
        this.uiStore.language = language
    }

    public getLanguage(): LocalizationLanguages {
        return this.uiStore.language
    }

    @action
    public setRTL(isRTL: boolean) {
        this.uiStore.isRTL = isRTL
    }

    public isRTL(): boolean {
        return this.uiStore.isRTL
    }
}
