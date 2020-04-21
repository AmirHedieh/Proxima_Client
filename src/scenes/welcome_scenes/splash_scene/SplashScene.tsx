import * as React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { BaseText } from '../../../components/base_text/BaseText'
import { Localization } from '../../../text_process/Localization'
import { StorageHelper } from '../../../utils/StorageHelper'
import { BaseScene, IBaseSceneProps } from '../../base_scene/BaseScene'
export class SplashScreen<SplashScreenProps extends IBaseSceneProps> extends BaseScene<SplashScreenProps, null> {
    public async componentDidMount(): Promise<void> {
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
                <BaseText text={'Welcome! This is TypeScript Temskkkplate'} />
                <Icon name='rocket' size={30} color='#900' />
            </View>
        )
    }
    protected onBackPress(): void {}
    private async loadAllData() {
        await StorageHelper.loadOfflineData()
    }
}
