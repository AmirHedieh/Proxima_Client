import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { View, ImageBackground } from 'react-native'
import { BaseText } from '../../components/base_text/BaseText'
import { NavigationActions } from '../../NavigationActions'
import { BaseScene, IBaseSceneState } from '../base_scene/BaseScene'
import { IMinimalProduct } from '../../models/MinimalProduct'
import { Styles } from './MinimalProductSceneStyles'
import { BackButton } from '../../components/back_button/BackButton'

export interface IMinimalProductSceneProps extends IMinimalProduct {}

@inject('AppState')
@observer
export class MinimalProductScene extends BaseScene<IMinimalProductSceneProps, IBaseSceneState> {
    public renderSafe(): JSX.Element {
        return (
            <View style={Styles.root}>
                <ImageBackground style={Styles.image} source={{ uri: this.props.picture }}>
                    <BackButton style={Styles.backButton} onPress={this.onBackPress} />
                </ImageBackground>
                <BaseText text={this.props.productName} />
                <BaseText text={this.props.price} />
            </View>
        )
    }

    protected onBackPress() {
        NavigationActions.pop()
        return true
    }
}
