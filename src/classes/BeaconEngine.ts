import { IBeacon } from '../models/Beacon'
import { IBeaconDetector } from './BeaconDetector'
import { RepeatDetector } from './RepeatDetector'

export class BeaconEngine {
    public onMajorChange: (major: number) => void = null
    public onMinorChange: (minor: number) => void = null
    private beaconDetector: IBeaconDetector = null
    private beacons: IBeacon[] = []
    private major: number
    private minor: number
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

    public async init(): Promise<boolean> {
        this.beaconDetector.init(500)
        this.beaconDetector.onBeaconFetch = (beacons) => {
            this.beacons = beacons
            this.processLoop()
        }
        return this.beaconDetector.startDetecting('')
    }

    private processLoop(): void {
        // console.log(this.beacons)
        if (this.beacons.length === 0) {
            return
        }
        const closestBeacon = this.findClosestBeacon()
        this.minorRepeatDetector.addToData(closestBeacon.minor)
        if (this.onMajorChange) {
            this.onMajorChange(this.beacons[0].major)
        }
        console.log(this.minorRepeatDetector.isDataRepeated())
        if (this.minorRepeatDetector.isDataRepeated()) {
            if (this.onMinorChange) {
                this.onMinorChange(closestBeacon.minor)
            }
        }
    }

    private findClosestBeacon(): IBeacon {
        let closestBeacon = this.beacons[0]
        for (const element of this.beacons) {
            if (Math.abs(element.rssi) >= Math.abs(closestBeacon.rssi)) {
                closestBeacon = element
            }
        }
        return closestBeacon
    }
}
