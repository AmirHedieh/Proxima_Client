export interface IBeacon {
    uuid: string
    major: number
    minor: number
    rssi: number
    distance: number
}
export interface IRawBeacon {
    uuid: string
    major: number
    minor: number
    rssi: number
    distance: number
}

export class BeaconFactory {
    public static generateBeacon(beacon: IRawBeacon): IBeacon {
        return {
            uuid: beacon.uuid,
            major: beacon.major,
            minor: beacon.minor,
            rssi: beacon.rssi,
            distance: beacon.distance
        }
    }
}
