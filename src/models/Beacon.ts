export interface IBeacon {
    uuid: string
    major: number
    minor: number
    rssi: number
}
export interface IRawBeacon {
    uuid: string
    major: number
    minor: number
    rssi: number
}

export class BeaconFactory {
    public static generateBeacon(beacon: IRawBeacon): IBeacon {
        return {
            uuid: beacon.uuid,
            major: beacon.major,
            minor: beacon.minor,
            rssi: beacon.rssi
        }
    }
}
