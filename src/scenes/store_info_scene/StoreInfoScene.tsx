import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { FlatList, View, Image } from 'react-native'
import { BaseText } from '../../components/base_text/BaseText'
import { ExpandingTab } from '../../components/expanding_tab/ExpandingTab'
import { NormalButton } from '../../components/normal_button/NormalButton'
import { SafeTouch } from '../../components/safe_touch/SafeTouch'
import { Product } from '../../models/Product'
import { NavigationActions } from '../../NavigationActions'
import { SceneParams } from '../../SceneParams'
import { RandomGenerator } from '../../utils/RandomGenerator'
import { BaseScene, IBaseSceneState } from '../base_scene/BaseScene'
import { Colors } from '../../Constants'
import { Styles } from './StoreInfoSceneStyles'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Dimension, GlobalStyles } from '../../GlobalStyles'
import { IStore } from '../../models/Store'

interface IProductSceneProps extends IStore {}

@inject('AppState')
@observer
export class StoreInfoScene extends BaseScene<IProductSceneProps, IBaseSceneState> {
    private infoIconSize: number = 29
    public renderSafe(): JSX.Element {
        return (
            <View style={Styles.root}>
                {/* <NormalButton
                    text={'Add product'}
                    onPress={() => {
                        this.props.AppState.addProduct(
                            new Product({
                                product: RandomGenerator.generateRandomNumber(0, 1000),
                                name: `Product ${RandomGenerator.generateRandomNumber(0, 1000)}`
                            })
                        )
                    }}
                /> */}
                <View style={Styles.topBar}>
                    <MaterialIcon name='weekend' size={59} />
                </View>

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
                            {/* <Icon name='rocket' size={25} /> */}
                            <View style={GlobalStyles.spacer} />
                            <BaseText text={this.props.whatsapp} />
                        </View>
                    )}

                    <View style={Styles.smallSpacer} />

                    {this.props.instagram && (
                        <View style={Styles.rowCenterView}>
                            {/* <Icon name='rocket' size={25} /> */}
                            <View style={GlobalStyles.spacer} />
                            <BaseText text={this.props.instagram} />
                        </View>
                    )}

                    <View style={Styles.smallSpacer} />

                    {this.props.telegram && (
                        <View style={Styles.rowCenterView}>
                            {/* <Icon name='rocket' size={25} /> */}
                            <View style={GlobalStyles.spacer} />
                            <BaseText text={this.props.telegram} />
                        </View>
                    )}
                </View>

                <ExpandingTab collapsedTitle={'products'} expandedContent={this.renderProductList()} />
            </View>
        )
    }

    protected onBackPress(): boolean {
        NavigationActions.pop()
        return true
    }

    private renderProductList(): JSX.Element {
        // const products = []
        // for (const element of this.props.AppState.getProductList().values()) {
        //     products.push(element)
        // }
        // return (
        //     <FlatList
        //         data={products}
        //         renderItem={this.renderProductFlatListItem}
        //         keyExtractor={Product.keyExtractor}
        //         numColumns={2}
        //     />
        // )
    }

    // it seems flatList item doesn't observe changes, so maybe it wont be reactive
    private renderProductFlatListItem = (event: { item: Product }) => {
        const product = event.item
        return (
            <SafeTouch
                onPress={() =>
                    SceneParams.MinimalProductScene.navigate({
                        productId: event.item.id
                    })
                }
            >
                <BaseText text={product.name} />
            </SafeTouch>
        )
    }
}
