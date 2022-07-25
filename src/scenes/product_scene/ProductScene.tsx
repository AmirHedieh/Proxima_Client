import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Image, ScrollView, View } from 'react-native'
import Swiper from 'react-native-swiper'
import { DomainViewModel } from '../../classes/DomainViewModel'
import { BaseText } from '../../components/base_text/BaseText'
import { RTLAwareView } from '../../components/rtl_aware/RTLAwareView'
import { SafeTouch } from '../../components/safe_touch/SafeTouch'
import { Colors, NetworkConfig } from '../../Constants'
import { NavigationActions } from '../../NavigationActions'
import { AttributeCard } from '../../RFC/AttributeCard/AttributeCard'
import { Localization } from '../../text_process/Localization'
import { CommonValidator } from '../../utils/Validator'
import { BaseScene, IBaseSceneState } from '../base_scene/BaseScene'
import { Styles } from './ProductSceneStyles'

export interface IProductSceneProps {
    AppState?: DomainViewModel
}

interface IState extends IBaseSceneState {
    limitDescriptionLength: boolean
}

@inject('AppState')
@observer
export class ProductScene extends BaseScene<IProductSceneProps, IState> {
    protected renderSafe(): JSX.Element {
        if (this.props.AppState.getCurrentProduct() == null) {
            return null
        }
        return (
            <View style={Styles.root}>
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
                        { CommonValidator.isEmptyArray(this.props.AppState.getCurrentProduct().pictures) ? this.renderNoPictureArea() : this.renderPictures()}
                    </Swiper>

                    <View style={Styles.largeSpacer} />
                    <View style={Styles.bottomContainer}>
                        <BaseText style={Styles.name} text={this.props.AppState.getCurrentProduct().name} />
                        <View style={Styles.largeSpacer} />
                        <RTLAwareView>
                            <View style={Styles.creatorSeparator} />
                            <View style={Styles.mediumHorizontalSpacer} />
                            <View>
                                <BaseText
                                    style={Styles.creatorTitleText}
                                    text={Localization.translate('creatorProductScene')}
                                />
                                <BaseText style={Styles.creatorText} text={this.props.AppState.getCurrentProduct().creator} />
                            </View>
                        </RTLAwareView>
                        <View style={Styles.mediumSpacer} />
                        <RTLAwareView>
                            <View style={Styles.creatorSeparator} />
                            <View style={Styles.mediumHorizontalSpacer} />
                            <View>
                                <BaseText
                                    style={Styles.creationTimeTitleText}
                                    text={Localization.translate('creationTimeProductScene')}
                                />
                                <BaseText style={Styles.creationTimeText} text={this.props.AppState.getCurrentProduct().creationTime} />
                            </View>
                        </RTLAwareView>
                        <View style={Styles.mediumSpacer} />
                        <View style={Styles.mediumSpacer} />
                        {this.renderAttributes()}
                        {this.renderDescription()}
                    </View>
                </ScrollView>
            </View>
        )
    }

    protected onBackPress() {
        this.props.AppState.resetMinor()
        NavigationActions.pop()
        return true
    }

    private renderAttributes(): JSX.Element[] {
        const attributesViews: JSX.Element[] = [] 
        for (const element of this.props.AppState.getCurrentProduct().attributes) {
            attributesViews.push(
                <AttributeCard title={element.title} description={element.description}/>
            )
            attributesViews.push(<View style={Styles.mediumSpacer} />)
        }
        return attributesViews
    }
    
    private renderDescription(): JSX.Element {
        if (this.props.AppState.getCurrentProduct().description.length < 300) {
            return (
                <BaseText
                    text={this.props.AppState.getCurrentProduct().description}
                />
            )
        }
        return (
            <View>
                <BaseText
                    numberOfLine={this.state.limitDescriptionLength ? 6 : null}
                    text={this.props.AppState.getCurrentProduct().description}
                />
                <SafeTouch
                    onPress={() => this.setState({limitDescriptionLength: !this.state.limitDescriptionLength})}
                >
                    <BaseText style={Styles.expandCollapseText} text={this.state.limitDescriptionLength
                        ? Localization.translate('moreDescriptionProductScene')
                        : Localization.translate('lessDescriptionProductScene')}
                    />
                </SafeTouch>
            </View>
        )
    }

    private renderNoPictureArea(): JSX.Element {
        return (
            <View style={[Styles.image, Styles.noImage]}>
                <BaseText style={Styles.noImageText} text={Localization.translate('noPictureProductScene')}/>
            </View>
        )
    }

    private renderPictures(): JSX.Element[] {
        const pictures: JSX.Element[] = []
        for (const element of this.props.AppState.getCurrentProduct().pictures) {
            pictures.push(
                <Image
                    key={element.id}
                    source={{ uri: NetworkConfig.localServerPictureBaseUrl + element.url }}
                    style={Styles.image}
                />
            )
        }
        return pictures
    }
}
