import { NativeEventEmitter, NativeModules } from 'react-native'
// @ts-ignore
import BleManager from 'react-native-ble-manager'
import { EnvironmentVariables } from '../Constants'

type BluetoothStateType = 'on' | 'off'
type BleManagerBleState = 'on' | 'off' | 'turning_on' | 'turning_off'

interface IBluetoothManager {
    enableAndroidBluetooth: (onSuccess?: () => void, onFail?: () => void) => void
    isBluetoothEnabled: () => boolean
    onBluetoothStateChange: (state: BluetoothStateType) => void
}

export class BluetoothManager implements IBluetoothManager {
    public onBluetoothStateChange: (state: BluetoothStateType) => void = null
    private bluetoothState: BluetoothStateType = null
    private BleManagerModule = NativeModules.BleManager
    private bleManagerEmitter = new NativeEventEmitter(this.BleManagerModule)

    public async init() {
        try {
            await BleManager.start()
            this.bleManagerEmitter.addListener('BleManagerDidUpdateState', (args: { state: BleManagerBleState }) => {
                console.log(args.state)
                this.setBluetoothState(args.state)
                if (this.onBluetoothStateChange) {
                    this.onBluetoothStateChange(this.bluetoothState)
                }
            })
            BleManager.checkState() // triggers the listener for once(called to set initial value)
        } catch (e) {
            console.log(e)
        }
    }

    public isBluetoothEnabled = () => this.bluetoothState === 'on'

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

    private setBluetoothState(state: BleManagerBleState): void {
        if (state === 'on') {
            this.bluetoothState = 'on'
            return
        }
        this.bluetoothState = 'off'
    }
}
