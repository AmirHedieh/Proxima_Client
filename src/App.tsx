import { Provider } from 'mobx-react'
import * as React from 'react'
import { FlatList, I18nManager, ScrollView, YellowBox, Linking } from 'react-native'
import { Actions, Router, Scene } from 'react-native-router-flux'
import { Animations } from './Animations'
import { stores } from './mobx/RootStore'
import { SceneParams } from './SceneParams'
import { FakeScene } from './scenes/FakeScene/FakeScene'
import { HomeScene } from './scenes/home_scene/HomeScene'
import { MinimalProductScene } from './scenes/minimal_product_scene/MinimalProductScene'
import { SplashScreen } from './scenes/welcome_scenes/splash_scene/SplashScene'
import { RequirementDialog } from './components/requirement_dialog/RequirementDialog'
import { Localization } from './text_process/Localization'
// @ts-ignore
import AndroidOpenSettings from 'react-native-android-open-settings'
import { EnvironmentVariables } from './Constants'
import { PermissionsHandler } from './utils/PermissionsHandler'
const animate = () => Animations.zoomIn()

// React native itself uses is mounted ,So for avoiding this warning popup every time I added this suppressor
// React native 0.55.4 is currently migrating to a new React API.
// Some warnings are expected in this version.
YellowBox.ignoreWarnings([
    'Warning: isMounted(...) is deprecated',
    'Module RCTImageLoader requires main queue setup',
    'Module RNFetchBlob requires main queue setup',
    'Class RCTCxxModule was not exported',
    // tslint:disable-next-line:max-line-length
    'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?',
    'Module FireBaseModule requires',
    'Warning: ViewPagerAndroid',
    'Warning: Async Storage',
    'Warning: NetInfo has',
    'Warning: Slider has'
])

if (ScrollView.defaultProps == null) {
    ScrollView.defaultProps = {}
}
ScrollView.defaultProps.keyboardShouldPersistTaps = 'handled'
ScrollView.defaultProps.bounces = false
ScrollView.defaultProps.scrollEventThrottle = 15

if (FlatList.defaultProps == null) {
    FlatList.defaultProps = {}
}
FlatList.defaultProps.initialNumToRender = 10
FlatList.defaultProps.maxToRenderPerBatch = 10
FlatList.defaultProps.scrollEventThrottle = 15
FlatList.defaultProps.bounces = false

I18nManager.allowRTL(false)
I18nManager.forceRTL(false)

const scenes = Actions.create(
    <Scene key='root' hideNavBar={true} transitionConfig={animate}>
        <Scene initial={true} key={SceneParams.SplashScreen.name} component={SplashScreen} />
        <Scene key={SceneParams.HomeScene.name} component={HomeScene} />
        <Scene key={SceneParams.MinimalProductScene.name} component={MinimalProductScene} />
        <Scene key={'fake'} component={FakeScene} />
    </Scene>
)

export class App extends React.Component {
    private requirementDialog: RequirementDialog = null

    public async componentDidMount() {
        stores.AppState.init()
        await stores.ConnectionStore.init(this.checkRequirements)
        this.checkRequirements()
    }

    public render() {
        return (
            <Provider {...stores}>
                <RequirementDialog ref={(ref) => (this.requirementDialog = ref)} />
                <Router scenes={scenes} />
            </Provider>
        )
    }

    private checkRequirements = async () => {
        if (stores.ConnectionStore.isInternetConnection() === false) {
            this.requirementDialog.show({
                message: Localization.translate('connectionErrorHomeScene'),
                icon: 'wifi'
            })
            return
        }
        if (stores.ConnectionStore.isBluetoothEnabled() === false) {
            const buttonText = EnvironmentVariables.isIos
                ? ''
                : Localization.translate('enableAndroidBluetoothHomeScene')
            this.requirementDialog.show({
                message: Localization.translate('bluetoothErrorHomeScene'),
                icon: 'bluetooth',
                buttonText,
                onButtonPressedCallback: () => {
                    // button is only appeared in android
                    stores.ConnectionStore.enableAndroidBluetooth()
                }
            })
            return
        }
        if ((await PermissionsHandler.isLocationPermissionAllowed()) === false) {
            this.requirementDialog.show({
                message: Localization.translate('locationPermissionErrorHomeScene'),
                icon: 'location-on',
                buttonText: Localization.translate('giveLocationPermissionHomeScene'),
                onButtonPressedCallback: async () => {
                    await PermissionsHandler.requestLocationPermission()
                    this.checkRequirements()
                }
            })
            return
        }
        if (stores.ConnectionStore.isLocationEnabled() === false) {
            // TODO: check if opening setting works for ios, if not change the flow
            const buttonText = Localization.translate('goToLocationSettingHomeScene')
            this.requirementDialog.show({
                message: Localization.translate('locationErrorHomeScene'),
                icon: 'location-on',
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
}
