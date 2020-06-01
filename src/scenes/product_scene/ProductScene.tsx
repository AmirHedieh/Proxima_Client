import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Image, View, ScrollView } from 'react-native'
import Swiper from 'react-native-swiper'
import { DomainViewModel } from '../../classes/DomainViewModel'
import { BaseText } from '../../components/base_text/BaseText'
import { Colors } from '../../Constants'
import { NavigationActions } from '../../NavigationActions'
import { Localization } from '../../text_process/Localization'
import { BaseScene, IBaseSceneState } from '../base_scene/BaseScene'
import { Styles } from './ProductSceneStyles'
import { RTLAwareView } from '../../components/rtl_aware/RTLAwareView'

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
                {/* add padding because of Swiper pagination dots absolute position */}
                <View style={Styles.largeSpacer} />
                <ScrollView contentContainerStyle={Styles.bottomContainer}>
                    <BaseText style={Styles.name} text={this.props.AppState.getCurrentProduct().productName} />
                    <View style={Styles.superSmallSpacer} />
                    <BaseText
                        style={Styles.price}
                        text={`${this.props.AppState.getCurrentProduct().price} ${Localization.translate('moneyUnit')}`}
                    />
                    <View style={Styles.superSmallSpacer} />
                    <View style={Styles.largeSpacer} />
                    <RTLAwareView style={Styles.materialsContainer}>
                        <View>
                            <BaseText style={Styles.bodyMaterialTitleText} text={'بدنه'} />
                            <BaseText style={Styles.bodyMaterialText} text={'گردو'} />
                        </View>
                        <View style={Styles.bodyClothSpacer} />
                        <View style={Styles.bodyClothSeparator} />
                        <View style={Styles.bodyClothSpacer} />
                        <View>
                            <BaseText style={Styles.clothMaterialTitleText} text={'پوشش'} />
                            <BaseText style={Styles.clothMaterialText} text={'مخمل'} />
                        </View>
                    </RTLAwareView>
                </ScrollView>
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
