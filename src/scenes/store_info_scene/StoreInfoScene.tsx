const LottieView = require('lottie-react-native')
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { FlatList, Image, ScrollView, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { DomainViewModel } from '../../classes/DomainViewModel'
import { BaseText } from '../../components/base_text/BaseText'
import { CategoryFilter } from '../../components/category_filter/CategoryFilter'
import { SafeTouch } from '../../components/safe_touch/SafeTouch'
import { Colors, NetworkConfig } from '../../Constants'
import { Dimension, GlobalStyles } from '../../GlobalStyles'
import { MinimalProduct } from '../../models/MinimalProduct'
import { Product } from '../../models/Product'
import { NavigationActions } from '../../NavigationActions'
import { MinimalProductCard } from '../../RFC/MinimalProductCard'
import { SceneParams } from '../../SceneParams'
import { Localization } from '../../text_process/Localization'
import { BaseScene } from '../base_scene/BaseScene'
import { Styles } from './StoreInfoSceneStyles'

const Animation = require('resources/animations/1115-ripple.json')

interface IProductSceneProps {
    AppState?: DomainViewModel
}

interface IProductSceneState {
    isShowingAppInfo: boolean
    isShowingProducts: boolean
}

@inject('AppState')
@observer
export class StoreInfoScene extends BaseScene<IProductSceneProps, IProductSceneState> {
    public state: IProductSceneState = {
        isShowingAppInfo: false,
        isShowingProducts: false
    }
    private infoIconSize: number = 29 * Dimension.scaleX
    private categoryTabRef: CategoryFilter = null

    public renderSafe(): JSX.Element {
        return (
            <View style={Styles.root}>
                {this.renderAppInfoTab()}
                {this.renderContainer()}
                {this.renderProductsExpandingTabBackground()}
                {this.renderProductsExpandingTab()}
                {this.renderCategoryTab()}
            </View>
        )
    }

    protected onBackPress(): boolean {
        NavigationActions.pop()
        return true
    }

    private renderAppInfoTab() {
        return (
            <Animatable.View
                transition={'height'}
                style={[
                    Styles.appInfoTabContainer,
                    this.state.isShowingAppInfo
                        ? Styles.appInfoTabExpandedContainer
                        : Styles.appInfoTabCollapsedContainer
                ]}
            >
                {this.state.isShowingAppInfo ? <BaseText text='app info' /> : null}
                {this.state.isShowingAppInfo ? <View style={GlobalStyles.spacer} /> : null}
                <SafeTouch
                    style={[
                        Styles.appInfoTabSafeTouch,
                        this.state.isShowingAppInfo
                            ? Styles.appInfoTabSafeTouchExpanded
                            : Styles.appInfoTabSafeTouchCollapsed
                    ]}
                    onPress={this.onAppInfoTabPress}
                >
                    {this.state.isShowingAppInfo ? (
                        <Image source={require('../../resources/images/arrow_up.png')} />
                    ) : (
                        <MaterialIcon name='weekend' size={55 * Dimension.scaleX} color={Colors.primaryMedium} />
                    )}
                </SafeTouch>
            </Animatable.View>
        )
    }

    private renderContainer(): JSX.Element {
        switch (this.props.AppState.getDetectionState()) {
            case 'NO_STORE_NO_BEACON':
                return this.renderSearching()
            case 'FOUND_STORE_NO_BEACON':
                return this.renderStoreInfo()
        }
    }

    private renderSearching(): JSX.Element {
        return (
            <View style={Styles.searchingContainer}>
                <View style={Styles.animationAndTextContainer}>
                    <View style={Styles.animationContainer}>
                        <LottieView
                            style={Styles.animation}
                            source={Animation}
                            autoPlay={true}
                            loop={true}
                            hardwareAccelerationAndroid={true}
                            resizeMode={'contain'}
                        />
                    </View>
                    <View style={Styles.mediumSpacer} />
                    <BaseText
                        style={Styles.searchingTitle}
                        text={Localization.translate('searchingTitleStoreInfoScene')}
                    />
                </View>
                <View style={Styles.searchingBottomTab}>
                    <MaterialIcon name={'directions-walk'} size={30} />
                    <BaseText
                        style={Styles.searchingBottomTabTitle}
                        text={Localization.translate('goToStoreBottomTabStoreInfoScene')}
                    />
                </View>
            </View>
        )
    }

    private renderStoreInfo(): JSX.Element {
        return (
            <ScrollView contentContainerStyle={Styles.centerScrollViewContainer}>
                <BaseText style={Styles.name} text={this.props.AppState.getStore()?.storeName} />

                <View style={Styles.mediumSpacer} />

                <Image
                    style={Styles.image}
                    source={{ uri: NetworkConfig.localServerPictureBaseUrl + this.props.AppState.getStore()?.picture }}
                />

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
        )
    }

    private renderProductsExpandingTabBackground(): JSX.Element {
        if (this.state.isShowingProducts) {
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
                    <View style={Styles.productsTabBackgroundContainer}>
                        <Animatable.View animation={'fadeInLeft'} useNativeDriver={true}>
                            <MaterialIcon name='weekend' size={42} color={Colors.black} />
                        </Animatable.View>
                        <View style={GlobalStyles.spacer} />
                        <Animatable.View animation={'fadeInRight'} useNativeDriver={true}>
                            <BaseText
                                style={Styles.productsTabBackgroundTitle}
                                text={this.props.AppState.getStore()?.storeName}
                            />
                        </Animatable.View>
                    </View>
                </Animatable.View>
            )
        }
        return null
    }

    private renderProductsExpandingTab() {
        if (this.props.AppState.getDetectionState() === 'NO_STORE_NO_BEACON') {
            return null
        }
        return (
            <Animatable.View
                transition={'height'}
                style={[
                    Styles.productsTabContainer,
                    this.state.isShowingProducts
                        ? Styles.productsTabExpandedContainer
                        : Styles.productsTabCollapsedContainer
                ]}
            >
                <SafeTouch
                    style={[
                        Styles.productsTabSafeTouch,
                        this.state.isShowingProducts
                            ? Styles.productsTabSafeTouchExpanded
                            : Styles.productsTabSafeTouchCollapsed
                    ]}
                    onPress={this.onProductTabPress}
                >
                    {this.state.isShowingProducts ? (
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
                {this.state.isShowingProducts ? this.renderProductList() : null}
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
                contentContainerStyle={Styles.productsTabFlatListContainer}
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
                    image={NetworkConfig.localServerPictureBaseUrl + event.item.picture}
                    title={event.item.productName}
                    price={event.item.price}
                />
            </View>
        )
    }

    private renderCategoryTab(): JSX.Element {
        if (this.isSceneMounted === false || this.props.AppState.getDetectionState() !== 'FOUND_STORE_NO_BEACON') {
            return null
        }
        return (
            <CategoryFilter
                categories={this.props.AppState.getCategoryList()}
                fetchData={this.props.AppState.fetchProducts}
                ref={(ref) => (this.categoryTabRef = ref)}
            />
        )
    }
    private onAppInfoTabPress = () => {
        this.setState({
            isShowingAppInfo: !this.state.isShowingAppInfo
        })
    }

    private onProductTabPress = () => {
        this.setState(
            {
                isShowingProducts: !this.state.isShowingProducts
            },
            () => {
                if (this.state.isShowingProducts) {
                    this.categoryTabRef.tabAnimatable.fadeInRight(200)
                } else {
                    this.categoryTabRef.tabAnimatable.fadeOutRight(200)
                }
            }
        )
    }
}
