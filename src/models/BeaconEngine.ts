import { IBeacon } from './Beacon'
import { IBeaconDetector } from './BeaconDetector'

export class BeaconEngine {
    public onMajorChange: (major: number) => void = null
    public onMinorChange: (minor: number) => void = null
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
        this.onMajorChange(this.beacons[0].major)
        this.onMinorChange(this.beacons[0].minor)
    }
}
