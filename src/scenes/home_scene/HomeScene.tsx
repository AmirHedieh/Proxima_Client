import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { FlatList, Linking, View } from 'react-native'
// @ts-ignore
import AndroidOpenSettings from 'react-native-android-open-settings'
import { BluetoothManager, IBluetoothManager } from '../../classes/BluetoothManager'
import { DomainViewModel } from '../../classes/DomainViewModel'
import { ILocationManager, LocationManager } from '../../classes/LocationManager'
import { INetManager, NetManager } from '../../classes/NetManager'
import { BaseText } from '../../components/base_text/BaseText'
import { ExpandingTab } from '../../components/expanding_tab/ExpandingTab'
import { NormalButton } from '../../components/normal_button/NormalButton'
import { RequirementDialog } from '../../components/requirement_dialog/RequirementDialog'
import { SafeTouch } from '../../components/safe_touch/SafeTouch'
import { EnvironmentVariables } from '../../Constants'
import { GlobalStyles } from '../../GlobalStyles'
import { Product } from '../../models/Product'
import { SceneParams } from '../../SceneParams'
import { Localization } from '../../text_process/Localization'
import { PermissionsHandler } from '../../utils/PermissionsHandler'
import { RandomGenerator } from '../../utils/RandomGenerator'
import { BaseScene } from '../base_scene/BaseScene'
import { ProductScene } from '../product_scene/ProductScene'
import { Styles } from './HomeSceneStyles'

interface IHomeSceneProps {
    AppState: DomainViewModel
}
interface IHomeSceneState {}

@inject('AppState')
@observer
export class HomeScene extends BaseScene<IHomeSceneProps, IHomeSceneState> {
    private netManager: INetManager = null
    private bluetoothManager: IBluetoothManager = null
    private locationManager: ILocationManager = null

    private requirementDialog: RequirementDialog = null
    private requirements = {
        isConnected: true,
        isBluetoothOn: true,
        isLocationOn: true
    }

    public constructor(props) {
        super(props)

        this.netManager = new NetManager()
        this.netManager.onConnectionStateChange = (isConnected) => {
            this.requirements.isConnected = isConnected
            this.checkRequirements()
        }

        this.bluetoothManager = new BluetoothManager()
        this.bluetoothManager.onBluetoothStateChange = (isEnabled) => {
            this.requirements.isBluetoothOn = isEnabled
            this.checkRequirements()
        }

        this.locationManager = new LocationManager()
        this.locationManager.onLocationStatusChange = (isEnabled) => {
            this.requirements.isLocationOn = isEnabled
            this.checkRequirements()
        }
    }

    protected async sceneDidMount() {
        this.netManager.subscribe() // event get called on subscribe once
        // await this.bluetoothManager.subscribe() // event get called on subscribe once
        // await this.locationManager.subscribe() //
        // this.checkRequirements()
    }

    protected sceneWillUnmount() {
        this.netManager.unSubscribe()
        this.bluetoothManager.unSubscribe()
        this.locationManager.unSubscribe()
    }

    protected renderSafe(): JSX.Element {
        return (
            <View style={{ width: '100%', height: '100%' }}>
                <RequirementDialog ref={(ref) => (this.requirementDialog = ref)} />
                {this.renderContent()}
            </View>
        )
    }
    protected onBackPress(): boolean {
        return true
    }
    private async checkRequirements() {
        if (this.requirements.isConnected === false) {
            this.requirementDialog.show({
                message: Localization.translate('connectionErrorHomeScene')
            })
            return
        }
        if (this.requirements.isBluetoothOn === false) {
            const buttonText = EnvironmentVariables.isIos
                ? ''
                : Localization.translate('enableAndroidBluetoothHomeScene')
            this.requirementDialog.show({
                message: Localization.translate('bluetoothErrorHomeScene'),
                buttonText,
                onButtonPressedCallback: () => {
                    // button is only appeared in android
                    this.bluetoothManager.enableAndroidBluetooth()
                }
            })
            return
        }
        if ((await PermissionsHandler.isLocationPermissionAllowed()) === false) {
            this.requirementDialog.show({
                message: Localization.translate('locationPermissionErrorHomeScene'),
                buttonText: Localization.translate('giveLocationPermissionHomeScene'),
                onButtonPressedCallback: async () => {
                    await PermissionsHandler.requestLocationPermission()
                    this.checkRequirements()
                }
            })
            return
        }
        if (this.requirements.isLocationOn === false) {
            // TODO: check if opening setting works for ios, if not change the flow
            const buttonText = Localization.translate('goToLocationSettingHomeScene')
            this.requirementDialog.show({
                message: Localization.translate('locationErrorHomeScene'),
                buttonText,
                onButtonPressedCallback: () => {
                    if (EnvironmentVariables.isIos) {
                        Linking.openURL('App-Prefs:LOCATION_SERVICES')
                    } else {
                        AndroidOpenSettings.locationSourceSettings()
                    }
                }
            })
            return
        }
        this.requirementDialog.hide()
    }
    private renderContent(): JSX.Element {
        return this.renderCurrentProduct()
        switch (this.props.AppState.getDetectionState()) {
            case 'NO_STORE_NO_BEACON':
                return this.renderSearchingStore()

            case 'FOUND_STORE_NO_BEACON':
                return this.renderShowProducts()

            case 'FOUND_STORE_FOUND_BEACON':
                return <BaseText text={'Beacon found'} />
            // TODO: decide if this must get handled from this page or from outside
        }
    }
    private renderSearchingStore(): JSX.Element {
        return <BaseText text={'Please enter an store'} />
    }

    private renderShowProducts(): JSX.Element {
        return (
            <View style={{ flex: 1, backgroundColor: '#39f' }}>
                <NormalButton
                    text={'Add product'}
                    onPress={() => {
                        this.props.AppState.addProduct(
                            new Product({
                                product: RandomGenerator.generateRandomNumber(0, 1000),
                                name: `Product ${RandomGenerator.generateRandomNumber(0, 1000)}`
                            })
                        )
                    }}
                />
                <View style={{ backgroundColor: '#f00', flexDirection: 'row', justifyContent: 'center' }}>
                    <BaseText text={'LOGO'} />
                    <View style={GlobalStyles.spacer} />
                    <BaseText text={'Name'} />
                </View>
                <ExpandingTab collapsedTitle={'products'} expandedContent={this.renderProductList()} />
            </View>
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
            />
        )
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

    private renderCurrentProduct(): JSX.Element {
        return <ProductScene productId={1} />
    }
}
