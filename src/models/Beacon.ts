import { observable } from 'mobx'

export class Beacon {
    private uuid: string
    @observable private major: number
    @observable private minor: number
    @observable private rssi: number

    // Getter
    public getUUID() {
        return this.uuid
    }
    public getMajor() {
        return this.major
    }
    public getMinor() {
        return this.minor
    }
    public getRSSI() {
        return this.rssi
    }
    // Setter
    public setRSSI(rssi) {
        this.rssi = rssi
    }
}
