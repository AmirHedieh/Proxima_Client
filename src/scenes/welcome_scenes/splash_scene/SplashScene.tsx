import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { View } from 'react-native'
// @ts-ignore
import Icon from 'react-native-vector-icons/FontAwesome'
import { BaseText } from '../../../components/base_text/BaseText'
import { NormalButton } from '../../../components/normal_button/NormalButton'
import { ViewModel } from '../../../classes/ViewModel'
import { Localization } from '../../../text_process/Localization'
import { StorageHelper } from '../../../utils/StorageHelper'
import { BaseScene, IBaseSceneProps } from '../../base_scene/BaseScene'
interface ISplashScreenProps extends IBaseSceneProps {
    AppState: ViewModel
}
@inject('AppState')
@observer
export class SplashScreen<Props extends ISplashScreenProps> extends BaseScene<Props, null> {
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
                <BaseText text={'Welcome! This is TypeScript template'} />
                <NormalButton text={'Add Product'} onPress={() => this.props.AppState.addProduct({})} />
                <BaseText text={this.props.AppState.getProductsLength} />
            </View>
        )
    }
    protected onBackPress(): void {}
    private async loadAllData() {
        await StorageHelper.loadOfflineData()
    }
}
