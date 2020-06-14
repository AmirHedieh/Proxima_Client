import * as React from 'react'
import { View } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { AppInfoTab } from '../../components/app_info_tab/AppInfoTab'
import { IBaseDialogProps, IBaseDialogState } from '../../components/base_dialog/BaseDialog'
import { BaseText } from '../../components/base_text/BaseText'
import { Colors } from '../../Constants'
import { SearchingStore } from '../../RFC/SearchingStore/SearchingStore'
import { Localization } from '../../text_process/Localization'
import { BaseScene } from '../base_scene/BaseScene'
import { Styles } from './LookingStoreSceneStyles'

export class LookingStoreScene extends BaseScene<IBaseDialogProps, IBaseDialogState> {
    public renderSafe(): JSX.Element {
        return (
            <View style={Styles.root}>
                <View style={Styles.container}>
                    <SearchingStore />
                </View>
                {this.renderWalkToStoreTab()}
                <AppInfoTab />
            </View>
        )
    }

    protected onBackPress(): boolean {
        return true
    }

    private renderWalkToStoreTab(): JSX.Element {
        return (
            <View style={Styles.bottomTabContainer}>
                <MaterialIcon name={'directions-walk'} size={30} color={Colors.primaryMedium} />
                <BaseText
                    style={Styles.bottomTabTitle}
                    text={Localization.translate('goToStoreBottomTabStoreInfoScene')}
                />
            </View>
        )
    }
}
