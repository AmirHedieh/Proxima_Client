import * as React from 'react'
import { View, FlatList } from 'react-native'
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome'
import { BaseText } from '../../../components/base_text/BaseText'
import { BeaconDetector } from '../../../models/BeaconDetector'
import { Localization } from '../../../text_process/Localization'
import { Logger } from '../../../utils/Logger'
import { StorageHelper } from '../../../utils/StorageHelper'
import { BaseScene, IBaseSceneProps } from '../../base_scene/BaseScene'
import { inject, observer } from 'mobx-react'
@inject('AppState')
@observer
export class SplashScreen<SplashScreenProps extends IBaseSceneProps> extends BaseScene<SplashScreenProps, null> {
    private beaconDetector = new BeaconDetector()
    public async componentDidMount(): Promise<void> {
        // this.beaconDetector.init(100)
        this.beaconDetector.onBeaconFetch = (data) => {
            Logger.log(data)
        }
        if (await this.beaconDetector.startDetecting('')) {
            Logger.log('started listening...')
        }
        await this.init()
    }
    protected async init(): Promise<void> {
        try {
            await this.loadAllData()
        } catch (e) {
            this.okDialog.show({
                title: Localization.translate('error'),
                message: e.message,
                onOkButtonPressedCallback: () => this.init()
            })
        }
    }
    protected renderSafe(): JSX.Element {
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <BaseText text={'Welcome! This is TypeScript template'} />
                <FlatList
                    data={this.props.AppState.beacons}
                    renderItem={(item) => {
                        return <BaseText text={item.rssi} />
                        return <BaseText text={item.rssi} />
                    }}
                />
            </View>
        )
    }
    protected onBackPress(): void {}
    private async loadAllData() {
        await StorageHelper.loadOfflineData()
    }
}
