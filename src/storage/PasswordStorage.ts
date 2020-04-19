import { EnvironmentVariables } from '../Constants'
import { StorageHelper } from '../utils/StorageHelper'

export class PasswordStorage {
  public static key = EnvironmentVariables.defaultDbName + ':password'
  public static set = (password: string): Promise<any> => {
    return StorageHelper.encrypt(PasswordStorage.key, password)
  }
  public static get = (): Promise<string> => {
    return StorageHelper.decrypt(PasswordStorage.key)
  }
}
