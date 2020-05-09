import * as React from 'react'
import { Linking, View } from 'react-native'
// @ts-ignore
import AndroidOpenSettings from 'react-native-android-open-settings'
import { BluetoothManager, IBluetoothManager } from '../../classes/BluetoothManager'
import { ILocationManager, LocationManager } from '../../classes/LocationManager'
import { INetManager, NetManager } from '../../classes/NetManager'
import { BaseText } from '../../components/base_text/BaseText'
import { NormalButton } from '../../components/normal_button/NormalButton'
import { RequirementDialog } from '../../components/requirement_dialog/RequirementDialog'
import { EnvironmentVariables } from '../../Constants'
import { Localization } from '../../text_process/Localization'
import { PermissionsHandler } from '../../utils/PermissionsHandler'
import { BaseScene, IBaseSceneProps } from '../base_scene/BaseScene'
import { Styles } from './HomeSceneStyles'
interface IHomeSceneState {
    requirements: {
        isConnected: boolean
        isBluetoothOn: boolean
        isLocationOn: boolean
    }
}
export class HomeScene extends BaseScene<IBaseSceneProps, IHomeSceneState> {
    private netManager: INetManager = null
    private bluetoothManager: IBluetoothManager = null
    private locationManager: ILocationManager = null

    private requirementDialog: RequirementDialog = null
    private requirements = {
        isConnected: true,
        isBluetoothOn: true,
        isLocationOn: true
    }

    public constructor(props) {
        super(props)

        this.netManager = new NetManager()
        this.netManager.onConnectionStateChange = (isConnected) => {
            this.requirements.isConnected = isConnected
            this.checkRequirements()
        }

        this.bluetoothManager = new BluetoothManager()
        this.bluetoothManager.onBluetoothStateChange = (isEnabled) => {
            this.requirements.isBluetoothOn = isEnabled
            this.checkRequirements()
        }

        this.locationManager = new LocationManager()
        this.locationManager.onLocationStatusChange = (isEnabled) => {
            this.requirements.isLocationOn = isEnabled
            this.checkRequirements()
        }
    }

    protected async sceneDidMount() {
        this.netManager.subscribe() // event get called on subscribe once
        await this.bluetoothManager.subscribe() // event get called on subscribe once
        await this.locationManager.subscribe() //
        this.checkRequirements()
    }

    protected sceneWillUnmount() {
        this.netManager.unSubscribe()
        this.bluetoothManager.unSubscribe()
        this.locationManager.unSubscribe()
    }

    protected renderSafe(): JSX.Element {
        return (
            <View>
                <BaseText text={'homescene'} />
                <NormalButton text='sss' onPress={() => Linking.openURL('App-Prefs:LOCATION_SERVICES')} />
                <RequirementDialog ref={(ref) => (this.requirementDialog = ref)} />
            </View>
        )
    }
    protected onBackPress(): boolean {
        return true
    }
    private async checkRequirements() {
        if (this.requirements.isConnected === false) {
            this.requirementDialog.show({
                message: Localization.translate('connectionErrorHomeScene')
            })
            return
        }
        if (this.requirements.isBluetoothOn === false) {
            this.requirementDialog.show({
                message: 'BLE'
            })
            return
        }
        if ((await PermissionsHandler.isLocationPermissionAllowed()) === false) {
            this.requirementDialog.show({
                // android
                message: 'Give the app location permission',
                buttonText: 'Give access',
                onButtonPressedCallback: async () => {
                    await PermissionsHandler.requestLocationPermission()
                    this.checkRequirements()
                }
            })
            return
        }
        if (this.requirements.isLocationOn === false) {
            // check location is off
            this.requirementDialog.show({
                message: 'turn on location',
                buttonText: 'Turn on',
                onButtonPressedCallback: () => {
                    if (EnvironmentVariables.isIos) {
                        Linking.openURL('App-Prefs:LOCATION_SERVICES')
                    } else {
                        AndroidOpenSettings.locationSourceSettings()
                    }
                }
            })
            return
        }
        this.requirementDialog.hide()
    }
}
