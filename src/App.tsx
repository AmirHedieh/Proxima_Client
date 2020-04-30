import { Provider } from 'mobx-react'
import * as React from 'react'
import { FlatList, I18nManager, ScrollView, YellowBox } from 'react-native'
import { Actions, Router, Scene } from 'react-native-router-flux'
import { Animations } from './Animations'
import { stores } from './mobx/RootStore'
import { SceneParams } from './SceneParams'
import { FakeScene } from './scenes/FakeScene/FakeScene'
import { SplashScreen } from './scenes/welcome_scenes/splash_scene/SplashScene'
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
        <Scene key={SceneParams.SplashScreen.name} component={SplashScreen} />
        <Scene key={'fake'} component={FakeScene} />
    </Scene>
)

export class App extends React.Component {
    public async componentDidMount(): Promise<void> {
        await stores.AppState.init()
    }
    public render() {
        return (
            <Provider {...stores}>
                <Router scenes={scenes} />
            </Provider>
        )
    }
}
