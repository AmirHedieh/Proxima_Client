import * as React from 'react'
import { View } from 'react-native'
import { BaseScene, IBaseSceneProps } from '../base_scene/BaseScene'
import { Styles } from './HomeSceneStyles'
import { RequirementDialog } from '../../components/requirement_dialog/RequirementDialog'
import { BaseText } from '../../components/base_text/BaseText'
import { Localization } from '../../text_process/Localization'
import { BluetoothManager } from '../../classes/BluetoothManager'
import { NetManager } from '../../classes/NetManager'
interface IHomeSceneState {
    requirements: {
        isConnected: boolean
        isBluetoothOn: boolean
        isLocationOn: boolean
    }
}
export class HomeScene extends BaseScene<IBaseSceneProps, IHomeSceneState> {
    private netManager: NetManager = null
    private bluetoothManager: BluetoothManager = null
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
    }

    protected async sceneDidMount() {
        this.netManager.init()
        await this.bluetoothManager.init()
        this.checkRequirements()
    }

    protected renderSafe(): JSX.Element {
        return (
            <View>
                <BaseText text={'homescene'} />
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
        this.requirementDialog.hide()
    }
}
