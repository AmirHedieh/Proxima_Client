import { IBeacon } from '../models/Beacon'
import { IBeaconDetector } from './BeaconDetector'
import { RepeatDetector } from './RepeatDetector'

interface IMajorHistogram {
    major: number
    repeat: number
}
export class BeaconEngine {
    public onMajorChange: (major: number) => void = null
    public onMinorChange: (major:number, minor: number) => void = null
    public onBeaconsUpdate: (beacons: IBeacon[]) => void = null
    public isMajorReady: boolean = false // a boolean to avoid major, minor data fetch collision(when Major is fetched, minor can be handled)
    private beaconDetector: IBeaconDetector = null
    private beacons: IBeacon[] = []
    private major: number = -1
    private minor: number = -1
    private majorRepeatDetector: RepeatDetector
    private minorRepeatDetector: RepeatDetector

    public constructor(beaconDetector: IBeaconDetector) {
        this.beaconDetector = beaconDetector
        this.majorRepeatDetector = new RepeatDetector(5)
        this.minorRepeatDetector = new RepeatDetector(3)
    }

    public getActiveMajor(): number {
        return this.major
    }

    public getActiveMinor(): number {
        return this.minor
    }

    public init(): void {
        this.beaconDetector.init()
        this.beaconDetector.onBeaconFetch = (beacons) => {
            this.beacons = beacons
            this.onBeaconsUpdate(beacons)
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

    public resetMinor(): void {
        this.minor = -1
    }

    private processLoop(): void {
        const sortedBeacons: IBeacon[] = this.sortByDistance(this.beacons)
        // console.log(sortedBeacons.map((item) => item.minor))
        const majorHistogram = this.majorHistogram(sortedBeacons)
        // const closestBeacon = this.sortByDistance(this.beacons)[0]
        // console.log('closest Beacon', closestBeacon)
        const sortedHistogram = majorHistogram.sort((a, b) => b.repeat - a.repeat)
        this.processMajor(sortedHistogram, sortedBeacons)
        if (this.major) {
            this.processMinor(sortedBeacons)
        } else {
            console.log('not in If')
        }
        console.log('major detector', this.majorRepeatDetector.data)
        console.log('minor detector', this.minorRepeatDetector.data)
        // this.processMajor2(closestBeacon)
        // this.processMinor2(closestBeacon)
    }

    // private processMajor2(closestBeacon: IBeacon): void {
    //     if (closestBeacon && closestBeacon.distance < 10) {
    //         if (this.major === closestBeacon.major) {
    //             return
    //         }
    //         this.major = closestBeacon.major
    //         this.onMajorChange(this.major)
    //     }
    // }

    // private processMinor2(closestBeacon: IBeacon): void {
    //     if (closestBeacon && closestBeacon.distance < 2.5) {
    //         if (this.minor === closestBeacon.minor) {
    //             return
    //         }
    //         this.minor = closestBeacon.minor
    //         this.onMinorChange(this.major, this.minor)
    //     }
    // }

    private processMajor(sortedHistogram: IMajorHistogram[], sortedBeacons: IBeacon[]) {
        const values = []
        for (const element of sortedBeacons) {
            values.push(element.distance)
        }
        console.log(values)
        if (sortedHistogram.length === 0 || Math.abs(sortedBeacons[0].distance) > 5) {
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
                    if (this.major === null) {
                        this.isMajorReady = false
                    }
                    // console.log('major changed', this.major)
                    // console.log('on major change called', this.major)
                    this.onMajorChange(this.major)
                }
            }
        }
    }

    private processMinor(sortedBeacons: IBeacon[]): void {
        if (sortedBeacons.length === 0 || Math.abs(sortedBeacons[0].distance) > 0.75) {
            console.log('added null')
            this.minorRepeatDetector.addToData(null)
        } else {
            this.minorRepeatDetector.addToData(sortedBeacons[0].minor)
        }
        console.log(this.minorRepeatDetector.isDataRepeated())
        if (this.minorRepeatDetector.isDataRepeated().isRepeated) {
            // if (this.minorRepeatDetector.isDataRepeated().repeatedValue === null) {
            //     return
            // }
            if (this.minor !== this.minorRepeatDetector.isDataRepeated().repeatedValue) {
                if (this.onMinorChange && this.isMajorReady) {
                    console.log('minor changed')
                    this.minor = this.minorRepeatDetector.isDataRepeated().repeatedValue
                    this.onMinorChange(this.major, this.minor)
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

    private sortByDistance(beacons: IBeacon[]) {
        // console.log('beacons', beacons)
        return beacons.sort((a, b) => a.distance - b.distance)
    }
}
