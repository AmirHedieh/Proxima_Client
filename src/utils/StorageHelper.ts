import { AsyncStorage } from 'react-native'
import { stores } from '../mobx/RootStore'
import { KeySessionStorage } from '../storage/KeySessionStorage'
import { LanguageStorage } from '../storage/LanguageStorage'
import { PasswordStorage } from '../storage/PasswordStorage'
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
                stores.UIState.changeLanguage(language as LocalizationLanguages)
            }
            const token = await KeySessionStorage.get()
            // set token to any global object
            const password = await PasswordStorage.get()
            // set password to any global object
        } catch (e) {
            Logger.error(e)
        }
    }
}
