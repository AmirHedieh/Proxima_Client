const LottieView = require('lottie-react-native')
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Animated, FlatList, Image, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { DomainViewModel } from '../../classes/DomainViewModel'
import { AppInfoTab } from '../../components/app_info_tab/AppInfoTab'
import { BaseText } from '../../components/base_text/BaseText'
import { CategoryFilter } from '../../components/category_filter/CategoryFilter'
import { SafeTouch } from '../../components/safe_touch/SafeTouch'
import { Colors, NetworkConfig } from '../../Constants'
import { Dimension, GlobalStyles } from '../../GlobalStyles'
import { MinimalProduct } from '../../models/MinimalProduct'
import { NavigationActions } from '../../NavigationActions'
import { MinimalProductCard } from '../../RFC/MinimalProductCard/MinimalProductCard'
import { StoreInfo } from '../../RFC/StoreInfo/StoreInfo'
import { SceneParams } from '../../SceneParams'
import { Localization } from '../../text_process/Localization'
import { BaseScene } from '../base_scene/BaseScene'
import { expandingTabCollapsedHeight, expandingTabExpandedHeight, Styles } from './StoreInfoSceneStyles'

const LoadingAnimation = require('resources/animations/51-preloader.json')

interface IProductSceneProps {
    AppState?: DomainViewModel
}

interface IProductSceneState {
    isShowingProducts: boolean
}

@inject('AppState')
@observer
export class StoreInfoScene extends BaseScene<IProductSceneProps, IProductSceneState> {
    public state: IProductSceneState = {
        isShowingProducts: false
    }

    private categoryTabRef: CategoryFilter = null
    private productsTabRef = null

    public renderSafe(): JSX.Element {
        return (
            <View style={Styles.root}>
                {this.renderStoreInfo()}
                <AppInfoTab />
                {this.renderProductsExpandingTabBackground()}
                {this.renderProductsExpandingTab()}
                {this.renderCategoryTab()}
            </View>
        )
    }

    protected onBackPress(): boolean {
        if (this.state.isShowingProducts) {
            this.onProductTabPress()
        }
        return true
    }

    private renderStoreInfo(): JSX.Element {
        return (
            <View
                style={{
                    flex: 1,
                    paddingVertical: Dimension.collapsedTabHeight
                }}
            >
                <StoreInfo {...this.props.AppState.getStore()} />
            </View>
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
                        height: Dimension.deviceHeight,
                        backgroundColor: Colors.primaryMedium
                    }}
                >
                    <View style={Styles.productsTabBackgroundContainer}>
                        <Animatable.View animation={'fadeInLeft'} useNativeDriver={true}>
                            <MaterialIcon name='weekend' size={42 * Dimension.scaleX} color={Colors.black} />
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
        return (
            <Animatable.View
                ref={(ref) => (this.productsTabRef = ref)}
                useNativeDriver={true}
                style={Styles.productsTabContainer}
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
                {this.renderProductList()}
            </Animatable.View>
        )
    }

    private renderProductList(): JSX.Element {
        if (this.props.AppState.getFetchData().isLoadingCategory) {
            return (
                <LottieView
                    style={Styles.animation}
                    source={LoadingAnimation}
                    autoPlay={true}
                    loop={true}
                    hardwareAccelerationAndroid={true}
                    resizeMode={'contain'}
                />
            )
        }
        if (
            this.props.AppState.getFetchData().isLoadingCategory === false &&
            this.props.AppState.getProductList().size === 0
        ) {
            return (
                <BaseText
                    style={{ color: '#000' }}
                    text={Localization.translate('noProductFoundInCategoryStoreInfoScene')}
                />
            )
        }
        return (
            <FlatList
                contentContainerStyle={Styles.productsTabFlatListContainer}
                data={[...this.props.AppState.getProductList().values()]}
                refreshing={true}
                renderItem={this.renderProductFlatListItem}
                keyExtractor={MinimalProduct.keyExtractor}
                initialNumToRender={12}
                numColumns={2}
                onEndReached={this.onEndReached}
                onEndReachedThreshold={0.2}
            />
        )
    }

    // it seems flatList item doesn't observe changes, so maybe it wont be reactive
    private renderProductFlatListItem = (event: { item: MinimalProduct; index }) => {
        const onPress = () => SceneParams.MinimalProductScene.navigate({ ...event.item })
        const style = event.index % 2 === 1 ? { marginTop: 24 * Dimension.scaleY } : null
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

    private onEndReached = ({ distanceFromEnd }) => {
        if (distanceFromEnd < 0) {
            return
        }
        this.props.AppState.fetchProducts({ category: this.props.AppState.getFetchData().category })
    }

    private renderCategoryTab(): JSX.Element {
        return (
            <CategoryFilter
                ref={(ref) => (this.categoryTabRef = ref)}
                categories={this.props.AppState.getCategoryList()}
                fetchData={this.props.AppState.fetchProducts}
            />
        )
    }

    private onProductTabPress = () => {
        this.setState(
            {
                isShowingProducts: !this.state.isShowingProducts
            },
            () => {
                if (this.state.isShowingProducts) {
                    this.categoryTabRef.show()
                } else {
                    this.categoryTabRef.hide()
                }
                this.productsTabRef.animate({
                    0: {
                        translateY: this.state.isShowingProducts
                            ? expandingTabExpandedHeight - expandingTabCollapsedHeight
                            : 0
                    },
                    1: {
                        translateY: this.state.isShowingProducts
                            ? 0
                            : expandingTabExpandedHeight - expandingTabCollapsedHeight
                    }
                })
            }
        )
    }
}
