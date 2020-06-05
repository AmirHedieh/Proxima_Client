import { AsyncStorage } from 'react-native'
import { stores } from '../mobx/RootStore'
import { LanguageStorage } from '../storage/LanguageStorage'
import { LocalizationLanguages } from '../Types'
import { AesEncryption } from './AesEncryption'
import { Logger } from './Logger'
import { CommonValidator } from './Validator'
export class StorageHelper {
    public static async decrypt(key: string): Promise<string> {
        const cipherDataStorage = await AsyncStorage.getItem(key)
        if (!CommonValidator.isNullOrEmpty(cipherDataStorage)) {
            return AesEncryption.decrypt(cipherDataStorage)
        }
        return null
    }
    public static encrypt(key: string, value: string): Promise<void> {
        const cipherDataStorage = AesEncryption.encrypt(value)
        return AsyncStorage.setItem(key, cipherDataStorage)
    }
    public static async loadOfflineData() {
        try {
            const language = await LanguageStorage.get()
            if (!CommonValidator.isNullOrEmpty(language)) {
                stores.UIState.setLanguage(language as LocalizationLanguages)
            }
        } catch (e) {
            Logger.error(e)
        }
    }
}
