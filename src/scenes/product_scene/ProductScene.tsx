import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Image, ScrollView, View } from 'react-native'
import Swiper from 'react-native-swiper'
import { DomainViewModel } from '../../classes/DomainViewModel'
import { BaseText } from '../../components/base_text/BaseText'
import { RTLAwareView } from '../../components/rtl_aware/RTLAwareView'
import { Colors, NetworkConfig } from '../../Constants'
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
        if (this.props.AppState.getCurrentProduct() == null) {
            return null
        }
        return (
            <ScrollView>
                <Swiper
                    containerStyle={Styles.swiper}
                    paginationStyle={{
                        position: 'absolute',
                        bottom: 0
                    }}
                    activeDotColor={Colors.black}
                    dotColor={Colors.creamLight}
                >
                    {this.renderPictures()}
                </Swiper>
                <View style={Styles.largeSpacer} />
                <View style={Styles.bottomContainer}>
                    <BaseText style={Styles.name} text={this.props.AppState.getCurrentProduct().productName} />
                    <View style={Styles.superSmallSpacer} />
                    <BaseText
                        style={Styles.price}
                        text={`${Localization.formatNumberToPrice(
                            this.props.AppState.getCurrentProduct().price
                        )} ${Localization.translate('moneyUnit')}`}
                    />
                    <View style={Styles.superSmallSpacer} />
                    <View style={Styles.largeSpacer} />
                    <RTLAwareView style={Styles.materialsContainer}>
                        <View>
                            <BaseText
                                style={Styles.bodyMaterialTitleText}
                                text={Localization.translate('bodyMaterialProductScene')}
                            />
                            <BaseText
                                style={Styles.bodyMaterialText}
                                text={this.props.AppState.getCurrentProduct().bodyMaterial}
                            />
                        </View>
                        <View style={Styles.bodyClothSpacer} />
                        <View style={Styles.bodyClothSeparator} />
                        <View style={Styles.bodyClothSpacer} />
                        <View>
                            <BaseText
                                style={Styles.clothMaterialTitleText}
                                text={Localization.translate('clothMaterialProductScene')}
                            />
                            <BaseText
                                style={Styles.clothMaterialText}
                                text={this.props.AppState.getCurrentProduct().clothMaterial}
                            />
                        </View>
                    </RTLAwareView>
                    <View style={Styles.mediumSpacer} />
                    <BaseText text={this.props.AppState.getCurrentProduct().info} />
                </View>
            </ScrollView>
        )
    }

    protected onBackPress() {
        NavigationActions.pop()
        return true
    }

    private renderPictures(): JSX.Element[] {
        const pictures: JSX.Element[] = []
        for (const element of this.props.AppState.getCurrentProduct().pictures) {
            pictures.push(
                <Image
                    key={element}
                    source={{ uri: NetworkConfig.localServerPictureBaseUrl + element }}
                    style={Styles.image}
                />
            )
        }
        return pictures
    }
}
