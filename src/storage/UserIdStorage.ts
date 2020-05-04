import { AsyncStorage } from 'react-native'
import { EnvironmentVariables } from '../Constants'

export class UserIdStorage {
    public static key = EnvironmentVariables.defaultDbName + ':userId'
    public static set = (token: string): Promise<any> => {
        return AsyncStorage.setItem(UserIdStorage.key, token)
    }
    public static get = (): Promise<string> => {
        return AsyncStorage.getItem(UserIdStorage.key)
    }
}
