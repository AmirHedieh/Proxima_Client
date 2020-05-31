import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { ImageBackground, View } from 'react-native'
import { BackButton } from '../../components/back_button/BackButton'
import { BaseText } from '../../components/base_text/BaseText'
import { NavigationActions } from '../../NavigationActions'
import { Localization } from '../../text_process/Localization'
import { BaseScene, IBaseSceneState } from '../base_scene/BaseScene'
import { Styles } from './ProductSceneStyles'
import { DomainViewModel } from '../../classes/DomainViewModel'

export interface IProductSceneProps {
    AppState?: DomainViewModel
}

@inject('AppState')
@observer
export class ProductScene extends BaseScene<IProductSceneProps, IBaseSceneState> {
    public renderSafe(): JSX.Element {
        return (
            <View style={Styles.root}>
                <ImageBackground
                    style={Styles.image}
                    source={{ uri: this.props.AppState.getCurrentProduct().picture[0] }}
                >
                    <BackButton style={Styles.backButton} onPress={this.onBackPress} />
                </ImageBackground>
                <View style={Styles.bottomContainer}>
                    <BaseText style={Styles.name} text={this.props.AppState.getCurrentProduct().productName} />
                    <BaseText
                        style={Styles.price}
                        text={`${this.props.AppState.getCurrentProduct().price} ${Localization.translate('moneyUnit')}`}
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
