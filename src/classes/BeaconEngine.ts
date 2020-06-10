import { IBeacon } from '../models/Beacon'
import { IBeaconDetector } from './BeaconDetector'
import { RepeatDetector } from './RepeatDetector'

interface IMajorHistogram {
    major: number
    repeat: number
}
export class BeaconEngine {
    public onMajorChange: (major: number) => void = null
    public onMinorChange: (minor: number) => void = null
    private beaconDetector: IBeaconDetector = null
    private beacons: IBeacon[] = []
    private major: number = -1
    private minor: number = -1
    private majorRepeatDetector: RepeatDetector
    private minorRepeatDetector: RepeatDetector

    public constructor(beaconDetector: IBeaconDetector) {
        this.beaconDetector = beaconDetector
        this.majorRepeatDetector = new RepeatDetector(4)
        this.minorRepeatDetector = new RepeatDetector(4)
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
        const sortedBeacons: IBeacon[] = this.sortByRSSI(this.beacons)
        console.log(sortedBeacons)
        const majorHistogram = this.majorHistogram(sortedBeacons)
        const sortedHistogram = majorHistogram.sort((a, b) => b.repeat - a.repeat)
        this.processMajor(sortedHistogram, sortedBeacons)
        if (this.major && this.major !== -1) {
            this.processMinor(sortedBeacons)
        }
    }

    private processMajor(sortedHistogram: IMajorHistogram[], sortedBeacons: IBeacon[]) {
        if (sortedHistogram.length === 0 || Math.abs(sortedBeacons[0].rssi) > 85) {
            this.majorRepeatDetector.addToData(null)
        } else if (sortedHistogram.length === 1) {
            this.majorRepeatDetector.addToData(sortedHistogram[0].major)
        } else {
            if (sortedHistogram[0].repeat === sortedHistogram[1].repeat) {
                this.majorRepeatDetector.addToData(sortedBeacons[0].major)
            } else {
                this.majorRepeatDetector.addToData(sortedHistogram[0].major)
            }
        }
        if (this.majorRepeatDetector.isDataRepeated().isRepeated) {
            if (this.major !== this.majorRepeatDetector.isDataRepeated().repeatedValue) {
                if (this.onMajorChange) {
                    this.major = this.majorRepeatDetector.isDataRepeated().repeatedValue
                    // console.log('on major change called', this.major)
                    this.onMajorChange(this.major)
                }
            }
        }
    }

    private processMinor(sortedBeacons: IBeacon[]): void {
        console.log(sortedBeacons)
        if (sortedBeacons.length === 0 || Math.abs(sortedBeacons[0].rssi) > 70) {
            this.minorRepeatDetector.addToData(null)
        } else {
            this.minorRepeatDetector.addToData(sortedBeacons[0].minor)
        }
        if (this.minorRepeatDetector.isDataRepeated().isRepeated) {
            if (this.minor !== this.minorRepeatDetector.isDataRepeated().repeatedValue) {
                if (this.onMinorChange) {
                    this.minor = this.minorRepeatDetector.isDataRepeated().repeatedValue
                    this.onMinorChange(this.minor)
                }
            }
        }
    }

    private majorHistogram(beacons: IBeacon[]) {
        const histogramList: IMajorHistogram[] = []
        const temp: any[] = []
        for (const beacon of beacons) {
            const major = beacon.major
            if (!temp[major]) {
                let repeat = 0
                for (const element of beacons) {
                    if (element.major === major) {
                        repeat++
                    }
                }
                histogramList.push({
                    major,
                    repeat
                })
                // add a value for this major to prevent re-entering for
                temp[major] = 1
            }
        }
        return histogramList
    }

    private sortByRSSI(beacons: IBeacon[]) {
        return beacons.sort((a, b) => b.rssi - a.rssi).slice(0, 4)
    }
}
