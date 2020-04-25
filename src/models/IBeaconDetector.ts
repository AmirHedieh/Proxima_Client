// @ts-ignore
import Beacons from 'react-native-beacons-manager'
import { EnvironmentVariables } from '../Constants'
import { Logger } from '../utils/Logger'

export class IBeaconDetector {
    constructor() {
        if (EnvironmentVariables.isIos) {
            this.configForIOS()
        } else {
            this.configForAndroid()
        }
    }
    public async startDetecting(region: string): Promise<boolean> {
        try {
            await Beacons.startRangingBeaconsInRegion(region)
            return true
        } catch (err) {
            Logger.log(`Beacons ranging not started, error: ${err.message}`)
        }
        return false
    }
    public async stopDetecting(region: string): Promise<void> {
        try {
            await Beacons.stopRangingBeaconsInRegion(region)
        } catch (err) {
            Logger.log(`Beacons ranging not started, error: ${err.message}`)
        }
    }
    // TODO: beacon manager package linking for IOS
    private configForIOS() {
        Beacons.requestAlwaysAuthorization()
    }
    private configForAndroid() {
        Beacons.detectIBeacons()
    }
}
