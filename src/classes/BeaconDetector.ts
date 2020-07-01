import { DeviceEventEmitter, EmitterSubscription } from 'react-native'
// @ts-ignore
import Beacons from 'react-native-beacons-manager'
import { EnvironmentVariables } from '../Constants'
import { BeaconFactory, IBeacon, IRawBeacon } from '../models/Beacon'
import { Logger } from '../utils/Logger'
export interface IBeaconDetector {
    onBeaconFetch: (data: IBeacon[]) => void
    startDetecting: (region?: string) => Promise<boolean>
    stopDetecting: (region?: string) => Promise<boolean>
    init: () => void
}
export class BeaconDetector implements IBeaconDetector {
    public onBeaconFetch: (data: IBeacon[]) => void = null
    private subscription: EmitterSubscription = null
    constructor() {
        Beacons.setForegroundScanPeriod(500)
        if (EnvironmentVariables.isIos) {
            this.configForIOS()
        } else {
            this.configForAndroid()
        }
    }
    public async startDetecting(region: string): Promise<boolean> {
        try {
            await Beacons.startRangingBeaconsInRegion(region)
            this.subscription = DeviceEventEmitter.addListener('beaconsDidRange', (data) =>
                this.onBeaconDidRange(data.beacons)
            )
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
            this.subscription.remove()
            return true
        } catch (err) {
            Logger.log(`Beacons ranging not started, error: ${err.message}`)
        }
        return false
    }
    public init(): void {
        // nothing todo
    }
    public addListener(type: string, callback: () => void) {
        DeviceEventEmitter.addListener(type, callback)
    }
    private onBeaconDidRange(data: IRawBeacon[]) {
        // parse data
        const beacons: IBeacon[] = []
        for (const element of data) {
            beacons.push(BeaconFactory.generateBeacon(element))
        }
        if (this.onBeaconFetch) {
            this.onBeaconFetch(beacons)
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
