import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Linking, View } from 'react-native'
// @ts-ignore
import AndroidOpenSettings from 'react-native-android-open-settings'
import { BluetoothManager, IBluetoothManager } from '../../classes/BluetoothManager'
import { DomainViewModel } from '../../classes/DomainViewModel'
import { ILocationManager, LocationManager } from '../../classes/LocationManager'
import { INetManager, NetManager } from '../../classes/NetManager'
import { RequirementDialog } from '../../components/requirement_dialog/RequirementDialog'
import { EnvironmentVariables } from '../../Constants'
import { Localization } from '../../text_process/Localization'
import { PermissionsHandler } from '../../utils/PermissionsHandler'
import { BaseScene } from '../base_scene/BaseScene'
import { ProductScene } from '../product_scene/ProductScene'
import { StoreInfoScene } from '../store_info_scene/StoreInfoScene'
import { Styles } from './HomeSceneStyles'

interface IHomeSceneProps {
    AppState: DomainViewModel
}
interface IHomeSceneState {}

@inject('AppState')
@observer
export class HomeScene extends BaseScene<IHomeSceneProps, IHomeSceneState> {
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

    protected async sceneWillUnmount() {
        this.netManager.unSubscribe()
        this.bluetoothManager.unSubscribe()
        this.locationManager.unSubscribe()

        await this.props.AppState.stopDetecting()
    }

    protected renderSafe(): JSX.Element {
        return (
            <View style={{ flex: 1 }}>
                <RequirementDialog ref={(ref) => (this.requirementDialog = ref)} />
                {this.renderContent()}
            </View>
        )
    }
    protected onBackPress(): boolean {
        return true
    }
    private async checkRequirements() {
        if (this.requirements.isConnected === false) {
            this.requirementDialog.show({
                message: Localization.translate('connectionErrorHomeScene'),
                icon: 'wifi'
            })
            return
        }
        if (this.requirements.isBluetoothOn === false) {
            const buttonText = EnvironmentVariables.isIos
                ? ''
                : Localization.translate('enableAndroidBluetoothHomeScene')
            this.requirementDialog.show({
                message: Localization.translate('bluetoothErrorHomeScene'),
                icon: 'bluetooth',
                buttonText,
                onButtonPressedCallback: () => {
                    // button is only appeared in android
                    this.bluetoothManager.enableAndroidBluetooth()
                }
            })
            return
        }
        if ((await PermissionsHandler.isLocationPermissionAllowed()) === false) {
            this.requirementDialog.show({
                message: Localization.translate('locationPermissionErrorHomeScene'),
                icon: 'location-on',
                buttonText: Localization.translate('giveLocationPermissionHomeScene'),
                onButtonPressedCallback: async () => {
                    await PermissionsHandler.requestLocationPermission()
                    this.checkRequirements()
                }
            })
            return
        }
        if (this.requirements.isLocationOn === false) {
            // TODO: check if opening setting works for ios, if not change the flow
            const buttonText = Localization.translate('goToLocationSettingHomeScene')
            this.requirementDialog.show({
                message: Localization.translate('locationErrorHomeScene'),
                icon: 'location-on',
                buttonText,
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
    private renderContent(): JSX.Element {
        // return this.renderCurrentProduct()
        switch (this.props.AppState.getDetectionState()) {
            case 'FOUND_STORE_FOUND_BEACON':
                return this.renderCurrentProduct()
            default:
                // states: no store found | store found but no beacon
                return this.renderStoreInfo()
        }
    }

    private renderStoreInfo(): JSX.Element {
        return <StoreInfoScene />
    }

    private renderCurrentProduct(): JSX.Element {
        return <ProductScene />
    }
}
