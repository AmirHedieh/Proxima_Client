import { inject, observer } from 'mobx-react'
import * as React from 'react'
import * as Animatable from 'react-native-animatable'
import { FlatList, Image, ScrollView, View } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { DomainViewModel } from '../../classes/DomainViewModel'
import { BaseText } from '../../components/base_text/BaseText'
import { ExpandingTab } from '../../components/expanding_tab/ExpandingTab'
import { Colors } from '../../Constants'
import { Dimension, GlobalStyles } from '../../GlobalStyles'
import { MinimalProduct } from '../../models/MinimalProduct'
import { Product } from '../../models/Product'
import { IStore } from '../../models/Store'
import { NavigationActions } from '../../NavigationActions'
import { MinimalProductCard } from '../../RFC/MinimalProductCard'
import { SceneParams } from '../../SceneParams'
import { Localization } from '../../text_process/Localization'
import { BaseScene } from '../base_scene/BaseScene'
import { Styles } from './StoreInfoSceneStyles'
import { SafeTouch } from '../../components/safe_touch/SafeTouch'

interface IProductSceneProps extends IStore {
    AppState?: DomainViewModel
}

interface IProductSceneState {
    isExpanded: boolean
}

@inject('AppState')
@observer
export class StoreInfoScene extends BaseScene<IProductSceneProps, IProductSceneState> {
    public state: IProductSceneState = {
        isExpanded: false
    }
    private infoIconSize: number = 29

    public renderSafe(): JSX.Element {
        return (
            <Animatable.View
                transition={'backgroundColor'}
                style={this.state.isExpanded ? [Styles.root, Styles.rootExpandedState] : Styles.root}
            >
                {this.renderContainer()}
                {/* {this.renderExpandingTab()} */}
            </Animatable.View>
        )
    }

    protected onBackPress(): boolean {
        NavigationActions.pop()
        return true
    }

    private renderContainer(): JSX.Element {
        if (!this.state.isExpanded) {
            return (
                <View>
                    <View style={Styles.topBar}>
                        <MaterialIcon name='weekend' size={55} color={Colors.primaryMedium} />
                        <SafeTouch onPress={() => this.onExpandingTabPress()}>
                            <BaseText text='switch' />
                        </SafeTouch>
                    </View>
                    <ScrollView>
                        <View style={Styles.centerContainer}>
                            <BaseText style={Styles.name} text={this.props.storeName} />

                            <View style={Styles.mediumSpacer} />

                            <Image style={Styles.image} source={{ uri: this.props.picture }} />

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
                </View>
            )
        }
        return (
            <View style={Styles.topBarExpandedState}>
                <MaterialIcon name='weekend' size={42} color={Colors.black} />
                <View style={GlobalStyles.spacer} />
                <BaseText style={Styles.expandedStateTitle} text={this.props.storeName} />
            </View>
        )
    }

    private renderExpandingTab() {
        return (
            <Animatable.View
                transition={'height'}
                style={[
                    Styles.expandingTabContainer,
                    this.state.isExpanded ? Styles.expandingTabExpandedContainer : Styles.expandingTabCollapsedContainer
                ]}
            >
                <SafeTouch
                    style={[
                        Styles.expandingTabSafeTouch,
                        this.state.isExpanded
                            ? Styles.expandingTabSafeTouchExpanded
                            : Styles.expandingTabSafeTouchCollapsed
                    ]}
                    onPress={this.onExpandingTabPress}
                >
                    {this.state.isExpanded ? (
                        <MaterialIcon size={52} name='expand-more' color='#000' />
                    ) : (
                        <BaseText
                            style={Styles.expandingTabCollapsedTitle}
                            text={Localization.translate('expandingTabTitleStoreInfoScene')}
                        />
                    )}
                </SafeTouch>
                {this.state.isExpanded ? this.renderProductList() : null}
            </Animatable.View>
        )
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
                // tslint:disable-next-line: jsx-no-lambda
                onEndReached={() => this.props.AppState.fetchProducts({ category: null })}
                onEndThreshold={0}
            />
        )
    }

    // it seems flatList item doesn't observe changes, so maybe it wont be reactive
    private renderProductFlatListItem = (event: { item: MinimalProduct; index }) => {
        const onPress = () => SceneParams.MinimalProductScene.navigate({ ...event.item })
        const style = event.index % 2 === 1 ? { marginTop: 24 * Dimension.scaleX } : null
        return (
            <View style={style}>
                <MinimalProductCard
                    onPress={onPress}
                    image={event.item.picture}
                    title={event.item.productName}
                    price={event.item.price}
                />
            </View>
        )
    }

    private onExpandingTabPress = () => {
        this.setState({
            isExpanded: !this.state.isExpanded
        })
    }
}
