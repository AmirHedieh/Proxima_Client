import { AsyncStorage } from 'react-native'
import { EnvironmentVariables } from '../Constants'
import { LocalizationLanguages } from '../Types'

export class LanguageStorage {
    public static key = EnvironmentVariables.defaultDbName + ':language'
    public static set = (language: LocalizationLanguages): Promise<any> => {
        return AsyncStorage.setItem(LanguageStorage.key, language)
    }
    public static get = (): Promise<string> => {
        return AsyncStorage.getItem(LanguageStorage.key)
    }
}
