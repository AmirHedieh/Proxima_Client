import { NativeEventEmitter, NativeModules } from 'react-native'
// @ts-ignore
import BleManager from 'react-native-ble-manager'
import { EnvironmentVariables } from '../Constants'

type BleManagerBleState = 'on' | 'off' | 'turning_on' | 'turning_off'

export interface IBluetoothManager {
    subscribe: () => void
    unSubscribe: () => void
    enableAndroidBluetooth: (onSuccess?: () => void, onFail?: () => void) => void
    onBluetoothStateChange: (isEnabled: boolean) => void
}

export class BluetoothManager implements IBluetoothManager {
    public onBluetoothStateChange: (isEnabled: boolean) => void = null
    private BleManagerModule = NativeModules.BleManager
    private bleManagerEmitter = new NativeEventEmitter(this.BleManagerModule)

    public async subscribe() {
        try {
            await BleManager.start()
            this.bleManagerEmitter.addListener('BleManagerDidUpdateState', this.onBleStateChange)
            BleManager.checkState() // execute listener on subscribe(called to set initial value)
        } catch (e) {
            console.log(e)
        }
    }

    public async enableAndroidBluetooth(onSuccess?: () => void, onFail?: () => void) {
        if (!EnvironmentVariables.isIos) {
            try {
                await BleManager.enableBluetooth()
                if (onSuccess) {
                    onSuccess()
                }
            } catch (e) {
                if (onFail) {
                    onFail()
                }
                console.log(e)
            }
        }
    }

    public unSubscribe() {
        BleManager.stopScan()
    }

    private onBleStateChange = (args: { state: BleManagerBleState }): void => {
        if (this.onBluetoothStateChange) {
            this.onBluetoothStateChange(args.state === 'on')
        }
    }
}
