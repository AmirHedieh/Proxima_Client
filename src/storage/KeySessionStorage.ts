import { EnvironmentVariables } from '../Constants'
import { StorageHelper } from '../utils/StorageHelper'

export class KeySessionStorage {
  public static key = EnvironmentVariables.defaultDbName + ':token'
  public static set = (token: string): Promise<any> => {
    return StorageHelper.encrypt(KeySessionStorage.key, token)
  }
  public static get = (): Promise<string> => {
    return StorageHelper.decrypt(KeySessionStorage.key)
  }
}
