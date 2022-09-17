const LottieView = require('lottie-react-native')
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { FlatList, Image, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { DomainViewModel } from '../../classes/DomainViewModel'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { AppInfoTab } from '../../components/app_info_tab/AppInfoTab'
import { BaseText } from '../../components/base_text/BaseText'
import { SafeTouch } from '../../components/safe_touch/SafeTouch'
import { Colors, NetworkConfig } from '../../Constants'
import { Dimension, GlobalStyles } from '../../GlobalStyles'
import { MinimalProduct } from '../../models/MinimalProduct'
import { MinimalProductCard } from '../../RFC/MinimalProductCard/MinimalProductCard'
import { StoreInfo } from '../../RFC/StoreInfo/StoreInfo'
import { SceneParams } from '../../SceneParams'
import { StaticImages } from '../../StaticImages'
import { Localization } from '../../text_process/Localization'
import { BaseScene } from '../base_scene/BaseScene'
import { expandingTabCollapsedHeight, expandingTabExpandedHeight, Styles } from './StoreInfoSceneStyles'

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

    private beacons: any[]  = []

    public renderSafe(): JSX.Element {
        return (
            <View style={Styles.root}>
                {this.renderStoreInfo()}
                <AppInfoTab />
                {this.renderWalkToStoreTab()}
            </View>
        )
    }

    protected onBackPress(): boolean {
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
                {/* {this.renderBeacons()} */}
                <StoreInfo {...this.props.AppState.getStore()} />
            </View>
        )
    }

    private renderBeacons() {
        const views = []
        for (const element of this.props.AppState.getBeacons()) {
            this.beacons[`key${element.major}${element.minor}`] = element
        }
        for (const key in this.beacons) {
            views.push (
                <View style={{marginTop: 16}}>
                    <BaseText text={`${this.beacons[key].major} ${this.beacons[key].minor} --> ${this.beacons[key].rssi} || ${this.beacons[key].distance}`}/>
                </View>
            )
        }
        return views
    }

    private renderWalkToStoreTab(): JSX.Element {
        return (
            <View style={Styles.bottomTabContainer}>
                <MaterialIcon name={'directions-walk'} size={30} color={Colors.primaryMedium} />
                <BaseText
                    style={Styles.bottomTabTitle}
                    text={Localization.translate('getCloseToItemStoreInfoScene')}
                />
            </View>
        )
    }
}
