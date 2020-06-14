import { observable } from 'mobx'
import { BluetoothManager, IBluetoothManager } from '../../classes/BluetoothManager'
import { ILocationManager, LocationManager } from '../../classes/LocationManager'
import { INetManager, NetManager } from '../../classes/NetManager'

export class ConnectionStore {
    @observable public isInternetConnection: boolean = true
    @observable public isBluetoothOn: boolean = true
    @observable public isLocationOn: boolean = true

    public onStateChange: () => void = null

    private netManager: INetManager = null
    private bluetoothManager: IBluetoothManager = null
    private locationManager: ILocationManager = null

    public constructor() {
        this.netManager = new NetManager()
        this.netManager.onConnectionStateChange = (isConnected) => {
            this.isInternetConnection = isConnected
            this.runCallback()
        }

        this.bluetoothManager = new BluetoothManager()
        this.bluetoothManager.onBluetoothStateChange = (isEnabled) => {
            this.isBluetoothOn = isEnabled
            this.runCallback()
        }

        this.locationManager = new LocationManager()
        this.locationManager.onLocationStatusChange = (isEnabled) => {
            this.isLocationOn = isEnabled
            this.runCallback()
        }
    }

    public async init(): Promise<void> {
        this.netManager.subscribe() // event get called on subscribe once
        await this.bluetoothManager.subscribe() // event get called on subscribe once
        await this.locationManager.subscribe() //
    }

    public getBluetoothManager(): IBluetoothManager {
        return this.bluetoothManager
    }

    private runCallback() {
        if (this.onStateChange) {
            this.onStateChange()
        }
    }
}
