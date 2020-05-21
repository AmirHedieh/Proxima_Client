import { IBeacon } from '../models/Beacon'
import { IBeaconDetector } from './BeaconDetector'
import { RepeatDetector } from './RepeatDetector'

export class BeaconEngine {
    public onMajorChange: (major: number) => void = null
    public onMinorChange: (minor: number) => void = null
    private beaconDetector: IBeaconDetector = null
    private beacons: IBeacon[] = []
    private major: number = -1
    private minor: number = -1
    private minorRepeatDetector: RepeatDetector

    public constructor(beaconDetector: IBeaconDetector) {
        this.beaconDetector = beaconDetector
        this.minorRepeatDetector = new RepeatDetector(3)
    }

    public getActiveMajor(): number {
        return this.major
    }

    public getActiveMinor(): number {
        return this.minor
    }

    public init(): void {
        this.beaconDetector.init(500)
        this.beaconDetector.onBeaconFetch = (beacons) => {
            this.beacons = beacons
            this.processLoop()
        }
    }

    public startDetecting(): Promise<boolean> {
        this.major = -1
        this.minor = -1
        return this.beaconDetector.startDetecting('')
    }

    public stopDetecting(): Promise<boolean> {
        return this.beaconDetector.stopDetecting('')
    }

    private processLoop(): void {
        console.log(this.beacons)
        for (const element of this.beacons) {
            console.log(`minor: ${element.minor} rssi: ${element.rssi}`)
        }
        if (this.beacons.length === 0) {
            return
        }
        const closestBeacon = this.findClosestBeacon()
        this.minorRepeatDetector.addToData(closestBeacon.minor)
        if (this.onMajorChange) {
            this.onMajorChange(this.beacons[0].major)
        }
        // TODO: prevent to invoke minor change when closest beacon is what was chosen last time as well
        if (this.minorRepeatDetector.isDataRepeated()) {
            if (this.onMinorChange) {
                this.onMinorChange(closestBeacon.minor)
            }
        }
    }

    private findClosestBeacon(): IBeacon {
        let closestBeacon = this.beacons[0]
        for (const element of this.beacons) {
            if (Math.abs(element.rssi) <= Math.abs(closestBeacon.rssi)) {
                closestBeacon = element
            }
        }
        return closestBeacon
    }
}
