import { AsyncStorage } from 'react-native'
import { EnvironmentVariables } from '../Constants'

export class AppDbVersionStorage {
  public static key = EnvironmentVariables.defaultDbName + ':appDbVersion'
  public static set = (version: string): Promise<any> => {
    return AsyncStorage.setItem(AppDbVersionStorage.key, version)
  }
  public static get = (): Promise<string> => {
    return AsyncStorage.getItem(AppDbVersionStorage.key)
  }
}
