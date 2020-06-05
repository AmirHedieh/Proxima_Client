import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { ImageBackground, View } from 'react-native'
import { BackButton } from '../../components/back_button/BackButton'
import { BaseText } from '../../components/base_text/BaseText'
import { NetworkConfig } from '../../Constants'
import { GlobalStyles } from '../../GlobalStyles'
import { IMinimalProduct } from '../../models/MinimalProduct'
import { NavigationActions } from '../../NavigationActions'
import { Localization } from '../../text_process/Localization'
import { BaseScene, IBaseSceneState } from '../base_scene/BaseScene'
import { Styles } from './MinimalProductSceneStyles'

export interface IMinimalProductSceneProps extends IMinimalProduct {}

@inject('AppState')
@observer
export class MinimalProductScene extends BaseScene<IMinimalProductSceneProps, IBaseSceneState> {
    public renderSafe(): JSX.Element {
        return (
            <View style={Styles.root}>
                <ImageBackground
                    style={Styles.image}
                    source={{ uri: NetworkConfig.localServerPictureBaseUrl + this.props.picture }}
                >
                    <BackButton style={Styles.backButton} onPress={this.onBackPress} />
                </ImageBackground>
                <View style={Styles.bottomContainer}>
                    <BaseText style={Styles.name} text={this.props.productName} />
                    <BaseText
                        style={Styles.price}
                        text={`${this.props.price} ${Localization.translate('moneyUnit')}`}
                    />
                    <View style={GlobalStyles.spacer} />
                    <BaseText style={Styles.noteTitle} text={Localization.translate('noteTitleMinimalProductScene')} />
                    <BaseText
                        style={Styles.noteMessage}
                        text={Localization.translate('noteMessageMinimalProductScene')}
                    />
                </View>
            </View>
        )
    }

    protected onBackPress() {
        NavigationActions.pop()
        return true
    }
}
