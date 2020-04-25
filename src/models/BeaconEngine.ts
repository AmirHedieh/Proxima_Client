import { IBeacon } from './Beacon'
import { IBeaconDetector } from './BeaconDetector'

export class BeaconEngine {
    private beaconDetector: IBeaconDetector = null
    private beacons: IBeacon[] = []
    private major: number
    private minor: number
    public constructor(beaconDetector: IBeaconDetector) {
        this.beaconDetector = beaconDetector
    }

    public getActiveMajor(): number {
        return this.major
    }

    public getActiveMinor(): number {
        return this.minor
    }

    public async init(): Promise<boolean> {
        this.beaconDetector.init(500)
        this.beaconDetector.onBeaconFetch = (beacons) => {
            this.beacons = beacons
            this.processLoop()
        }
        return this.beaconDetector.startDetecting('')
    }

    private processLoop(): void {
        this.major = this.beacons[0] ? this.beacons[0].major : null
        this.minor = this.beacons[0] ? this.beacons[0].minor : null
    }
}
