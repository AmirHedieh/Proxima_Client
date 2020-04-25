import { DeviceEventEmitter } from 'react-native'
// @ts-ignore
import Beacons from 'react-native-beacons-manager'
import { EnvironmentVariables } from '../Constants'
import { Logger } from '../utils/Logger'
import { BeaconFactory, IBeacon, IRawBeacon } from './Beacon'
interface IBeaconDetector {
    startDetecting: (region?: string) => Promise<boolean>
    stopDetecting: (region?: string) => Promise<boolean>
    init: (period: number) => void
}
export class BeaconDetector implements IBeaconDetector {
    public onBeaconFetch: (data: IBeacon[]) => void = null
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
            DeviceEventEmitter.addListener('beaconsDidRange', (data) => this.onBeaconDidRange(data.beacons))
            return true
        } catch (err) {
            Logger.log(`Beacons ranging not started, error: ${err.message}`)
        }
        return false
    }
    // TODO: ask if return type must be bool
    public async stopDetecting(region: string): Promise<boolean> {
        try {
            await Beacons.stopRangingBeaconsInRegion(region)
            return true
        } catch (err) {
            Logger.log(`Beacons ranging not started, error: ${err.message}`)
        }
        return false
    }
    public init(period: number): void {
        Beacons.setForegroundScanPeriod(period)
    }
    public addListener(type: string, callback: () => void) {
        DeviceEventEmitter.addListener(type, callback)
    }
    private onBeaconDidRange(data: IRawBeacon[]) {
        Logger.log('on beacon did range called')
        // parse data
        const beacons: IBeacon[] = []
        for (const element of data) {
            beacons.push(BeaconFactory.generateBeacon(element))
        }
        this.onBeaconFetch(beacons)
    }
    // TODO: beacon manager package linking for IOS
    private configForIOS() {
        Beacons.requestAlwaysAuthorization()
    }
    private configForAndroid() {
        Beacons.detectIBeacons()
    }
}
