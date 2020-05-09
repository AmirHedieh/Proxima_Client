import { PermissionsAndroid } from 'react-native'
import { EnvironmentVariables } from '../Constants'

// TODO: handle ios permissions
export class PermissionsHandler {
    public static async isLocationPermissionAllowed(): Promise<boolean> {
        if (EnvironmentVariables.isIos) {
            return true
        }
        return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
    }

    public static async requestLocationPermission(): Promise<boolean> {
        if (EnvironmentVariables.isIos) {
            return true
        }
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION)
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true
        } else {
            return false
        }
    }
}
