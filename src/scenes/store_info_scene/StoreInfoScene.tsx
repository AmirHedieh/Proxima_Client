import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { FlatList, Image, ScrollView, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { DomainViewModel } from '../../classes/DomainViewModel'
import { BaseText } from '../../components/base_text/BaseText'
import { SafeTouch } from '../../components/safe_touch/SafeTouch'
import { Colors } from '../../Constants'
import { Dimension, GlobalStyles } from '../../GlobalStyles'
import { MinimalProduct } from '../../models/MinimalProduct'
import { Product } from '../../models/Product'
import { NavigationActions } from '../../NavigationActions'
import { MinimalProductCard } from '../../RFC/MinimalProductCard'
import { SceneParams } from '../../SceneParams'
import { Localization } from '../../text_process/Localization'
import { BaseScene } from '../base_scene/BaseScene'
import { Styles } from './StoreInfoSceneStyles'

interface IProductSceneProps {
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
    private infoIconSize: number = 29 * Dimension.scaleX

    public renderSafe(): JSX.Element {
        return (
            <View style={Styles.root}>
                {this.renderContainer()}
                {this.renderExpandingTabBackground()}
                {this.renderExpandingTab()}
            </View>
        )
    }

    protected onBackPress(): boolean {
        NavigationActions.pop()
        return true
    }

    private renderContainer(): JSX.Element {
        return (
            <View style={{ flex: 1 }}>
                <View style={Styles.topBar}>
                    <MaterialIcon name='weekend' size={55 * Dimension.scaleX} color={Colors.primaryMedium} />
                </View>
                <ScrollView contentContainerStyle={Styles.centerScrollViewContainer}>
                    <BaseText style={Styles.name} text={this.props.AppState.getStore()?.storeName} />

                    <View style={Styles.mediumSpacer} />

                    <Image style={Styles.image} source={{ uri: this.props.AppState.getStore()?.picture }} />

                    <View style={Styles.largeSpacer} />

                    <View style={Styles.rowCenterView}>
                        <MaterialIcon name='home' size={this.infoIconSize} />
                        <View style={GlobalStyles.spacer} />
                        <BaseText text={this.props.AppState.getStore()?.address} />
                    </View>

                    <View style={Styles.smallSpacer} />

                    <View style={Styles.rowCenterView}>
                        <MaterialIcon name='phone' size={this.infoIconSize} />
                        <View style={GlobalStyles.spacer} />
                        <BaseText style={Styles.phoneNumber} text={this.props.AppState.getStore()?.phoneNumber} />
                    </View>

                    <View style={Styles.mediumSpacer} />

                    <BaseText style={Styles.info} text={this.props.AppState.getStore()?.info} />

                    <View style={Styles.mediumSpacer} />

                    {this.props.AppState.getStore()?.whatsapp && (
                        <View style={Styles.rowCenterView}>
                            <FontAwesomeIcon name='whatsapp' size={this.infoIconSize} />
                            <View style={GlobalStyles.spacer} />
                            <BaseText style={Styles.contactText} text={this.props.AppState.getStore()?.whatsapp} />
                        </View>
                    )}

                    <View style={Styles.smallSpacer} />

                    {this.props.AppState.getStore()?.instagram && (
                        <View style={Styles.rowCenterView}>
                            <FontAwesomeIcon name='instagram' size={this.infoIconSize} />
                            <View style={GlobalStyles.spacer} />
                            <BaseText style={Styles.contactText} text={this.props.AppState.getStore()?.instagram} />
                        </View>
                    )}

                    <View style={Styles.smallSpacer} />

                    {this.props.AppState.getStore()?.telegram && (
                        <View style={Styles.rowCenterView}>
                            <FontAwesome5 name='telegram-plane' size={this.infoIconSize} />
                            <View style={GlobalStyles.spacer} />
                            <BaseText style={Styles.contactText} text={this.props.AppState.getStore()?.telegram} />
                        </View>
                    )}
                </ScrollView>
            </View>
        )
    }

    private renderExpandingTabBackground(): JSX.Element {
        if (this.state.isExpanded) {
            return (
                <Animatable.View
                    animation={'fadeIn'}
                    useNativeDriver={true}
                    duration={320}
                    style={{
                        position: 'absolute',
                        top: 0,
                        width: '100%',
                        height: Dimension.deviceHeight * 0.3,
                        backgroundColor: Colors.primaryMedium
                    }}
                >
                    <View style={Styles.expandingTabBackgroundContainer}>
                        <Animatable.View animation={'fadeInLeft'} useNativeDriver={true}>
                            <MaterialIcon name='weekend' size={42} color={Colors.black} />
                        </Animatable.View>
                        <View style={GlobalStyles.spacer} />
                        <Animatable.View animation={'fadeInRight'} useNativeDriver={true}>
                            <BaseText
                                style={Styles.expandingTabBackgroundTitle}
                                text={this.props.AppState.getStore()?.storeName}
                            />
                        </Animatable.View>
                    </View>
                </Animatable.View>
            )
        }
        return null
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
                        <Image
                            style={{ transform: [{ rotate: '180deg' }] }}
                            source={require('../../resources/images/arrow_up.png')}
                        />
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
                contentContainerStyle={Styles.expandingTabFlatListContainer}
                data={products}
                renderItem={this.renderProductFlatListItem}
                keyExtractor={Product.keyExtractor}
                initialNumToRender={12}
                numColumns={2}
                // tslint:disable-next-line: jsx-no-lambda
                onEndReached={() => this.props.AppState.fetchProducts({ category: null })}
                onEndReachedThreshold={0.5}
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
