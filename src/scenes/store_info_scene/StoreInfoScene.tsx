import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { FlatList, Image, ScrollView, View } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { DomainViewModel } from '../../classes/DomainViewModel'
import { BaseText } from '../../components/base_text/BaseText'
import { ExpandingTab } from '../../components/expanding_tab/ExpandingTab'
import { NormalButton } from '../../components/normal_button/NormalButton'
import { SafeTouch } from '../../components/safe_touch/SafeTouch'
import { Colors } from '../../Constants'
import { Dimension, GlobalStyles } from '../../GlobalStyles'
import { MinimalProduct } from '../../models/MinimalProduct'
import { Product } from '../../models/Product'
import { IStore } from '../../models/Store'
import { NavigationActions } from '../../NavigationActions'
import { MinimalProductCard } from '../../RFC/MinimalProductCard'
import { SceneParams } from '../../SceneParams'
import { Localization } from '../../text_process/Localization'
import { BaseScene, IBaseSceneState } from '../base_scene/BaseScene'
import { Styles } from './StoreInfoSceneStyles'

interface IProductSceneProps extends IStore {
    AppState?: DomainViewModel
}

@inject('AppState')
@observer
export class StoreInfoScene extends BaseScene<IProductSceneProps, IBaseSceneState> {
    private infoIconSize: number = 29
    public renderSafe(): JSX.Element {
        return (
            <View style={Styles.root}>
                <View style={Styles.topBar}>
                    <MaterialIcon name='weekend' size={55} color={Colors.primaryMedium} />
                    <View style={Styles.smallSpacer} />
                    <BaseText style={Styles.topBarTitle} text={Localization.translate('topBarTitleHomeScene')} />
                </View>
                <ScrollView>
                    <View style={Styles.centerContainer}>
                        <BaseText style={Styles.name} text={this.props.name} />

                        <View style={Styles.mediumSpacer} />

                        <Image style={Styles.image} source={{ uri: 'https://i.picsum.photos/id/826/200/200.jpg' }} />

                        <View style={Styles.largeSpacer} />

                        <View style={Styles.rowCenterView}>
                            <MaterialIcon name='home' size={this.infoIconSize} />
                            <View style={GlobalStyles.spacer} />
                            <BaseText text={this.props.address} />
                        </View>

                        <View style={Styles.smallSpacer} />

                        <View style={Styles.rowCenterView}>
                            <MaterialIcon name='phone' size={this.infoIconSize} />
                            <View style={GlobalStyles.spacer} />
                            <BaseText style={Styles.phoneNumber} text={this.props.phoneNumber} />
                        </View>

                        <View style={Styles.mediumSpacer} />

                        <BaseText style={Styles.info} text={this.props.info} />

                        <View style={Styles.mediumSpacer} />

                        {this.props.whatsapp && (
                            <View style={Styles.rowCenterView}>
                                <FontAwesomeIcon name='whatsapp' size={this.infoIconSize} />
                                <View style={GlobalStyles.spacer} />
                                <BaseText style={Styles.contactText} text={this.props.whatsapp} />
                            </View>
                        )}

                        <View style={Styles.smallSpacer} />

                        {this.props.instagram && (
                            <View style={Styles.rowCenterView}>
                                <FontAwesomeIcon name='instagram' size={this.infoIconSize} />
                                <View style={GlobalStyles.spacer} />
                                <BaseText style={Styles.contactText} text={this.props.instagram} />
                            </View>
                        )}

                        <View style={Styles.smallSpacer} />

                        {this.props.telegram && (
                            <View style={Styles.rowCenterView}>
                                <FontAwesome5 name='telegram-plane' size={this.infoIconSize} />
                                <View style={GlobalStyles.spacer} />
                                <BaseText style={Styles.contactText} text={this.props.telegram} />
                            </View>
                        )}
                    </View>
                </ScrollView>
                <ExpandingTab
                    collapsedTitle={Localization.translate('expandingTabTitleStoreInfoScene')}
                    expandedContent={this.renderProductList()}
                />
            </View>
        )
    }

    protected onBackPress(): boolean {
        NavigationActions.pop()
        return true
    }

    private renderProductList(): JSX.Element {
        const products = []
        for (const element of this.props.AppState.getProductList().values()) {
            products.push(element)
        }
        return (
            <FlatList
                data={products}
                renderItem={this.renderProductFlatListItem}
                keyExtractor={Product.keyExtractor}
                numColumns={2}
            />
        )
    }

    // it seems flatList item doesn't observe changes, so maybe it wont be reactive
    private renderProductFlatListItem = (event: { item: MinimalProduct; index }) => {
        const onPress = () => SceneParams.MinimalProductScene.navigate({ productId: event.item.id })
        const style = event.index % 2 === 1 ? { marginTop: 24 * Dimension.scaleX } : null
        return (
            <View style={style}>
                <MinimalProductCard
                    onPress={onPress}
                    image={event.item.picture}
                    title={event.item.name}
                    price={event.item.price}
                />
            </View>
        )
    }
}
