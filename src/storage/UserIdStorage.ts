import { AsyncStorage } from 'react-native'
import { EnvironmentVariables } from '../Constants'

export class UserIdStorage {
    public static key = EnvironmentVariables.defaultDbName + ':userId'
    public static set = (id: number): Promise<any> => {
        return AsyncStorage.setItem(UserIdStorage.key, String(id))
    }
    public static get = (): Promise<string> => {
        return AsyncStorage.getItem(UserIdStorage.key)
    }
}
