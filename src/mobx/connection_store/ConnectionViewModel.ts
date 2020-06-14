import { ConnectionStore } from './ConnectionStore'

export class ConnectionViewModel {
    private connectionStore: ConnectionStore

    public constructor(store: ConnectionStore) {
        this.connectionStore = store
    }

    public init(onStateChange: () => void): Promise<void> {
        this.connectionStore.onStateChange = onStateChange
        return this.connectionStore.init()
    }

    public isInternetConnection(): boolean {
        return this.connectionStore.isInternetConnection
    }

    public isBluetoothEnabled(): boolean {
        return this.connectionStore.isBluetoothOn
    }

    public isLocationEnabled(): boolean {
        return this.connectionStore.isLocationOn
    }

    public enableAndroidBluetooth(): void {
        this.connectionStore.getBluetoothManager().enableAndroidBluetooth()
    }
}
