import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Image, View } from 'react-native'
import Swiper from 'react-native-swiper'
import { DomainViewModel } from '../../classes/DomainViewModel'
import { BaseText } from '../../components/base_text/BaseText'
import { Colors } from '../../Constants'
import { NavigationActions } from '../../NavigationActions'
import { Localization } from '../../text_process/Localization'
import { BaseScene, IBaseSceneState } from '../base_scene/BaseScene'
import { Styles } from './ProductSceneStyles'

export interface IProductSceneProps {
    AppState?: DomainViewModel
}

@inject('AppState')
@observer
export class ProductScene extends BaseScene<IProductSceneProps, IBaseSceneState> {
    protected renderSafe(): JSX.Element {
        return (
            <View style={Styles.root}>
                <Swiper
                    paginationStyle={{
                        position: 'absolute',
                        bottom: -Styles.largeSpacer.height
                    }}
                    activeDotColor={Colors.black}
                    dotColor={Colors.creamLight}
                >
                    {this.renderPictures()}
                </Swiper>
                <View style={Styles.largeSpacer} />
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

    private renderPictures(): JSX.Element[] {
        const pictures: JSX.Element[] = []
        for (const element of this.props.AppState.getCurrentProduct().pictures) {
            pictures.push(<Image key={element} source={{ uri: element }} style={Styles.image} />)
        }
        return pictures
    }
}
