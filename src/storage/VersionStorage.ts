import { AsyncStorage } from 'react-native'
import { EnvironmentVariables } from '../Constants'

export class VersionStorage {
    public static key = EnvironmentVariables.defaultDbName + ':appVersion'
    public static set = (version: string): Promise<any> => {
        return AsyncStorage.setItem(VersionStorage.key, version)
    }
    public static get = (): Promise<string> => {
        return AsyncStorage.getItem(VersionStorage.key)
    }
}
