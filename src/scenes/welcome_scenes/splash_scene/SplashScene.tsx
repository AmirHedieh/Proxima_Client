import * as React from 'react'
import { View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { BaseText } from '../../../components/base_text/BaseText'
import { Colors } from '../../../Constants'
import { Dimension, Fonts } from '../../../GlobalStyles'
import { stores } from '../../../mobx/RootStore'
import { NavigationActions } from '../../../NavigationActions'
import { SceneParams } from '../../../SceneParams'
import { StaticImages } from '../../../StaticImages'
import { Localization } from '../../../text_process/Localization'
import { EVENTS, ListenerManager } from '../../../utils/ListenerManager'
import { BaseScene } from '../../base_scene/BaseScene'

export class SplashScreen extends BaseScene<null, null> {

    protected async sceneDidMount() {
        await this.init()
    }

    public componentWillUnmount() {
        stores.AppState.init() // init app engine
        ListenerManager.getInstance().emitEvent(EVENTS.SplashProcessFinish)
    }

    protected async init(): Promise<void> {
        await stores.AppState.startDetecting()
    }

    protected renderSafe(): JSX.Element {
        return (
            <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.creamMedium }}
            >
                <View style={{ width: 196 * Dimension.scaleX, height: 196 * Dimension.scaleX }}>
                    <Animatable.Image
                        resizeMode={'contain'}
                        source={StaticImages.logoTransparent}
                        style={{ alignSelf: 'center', height: '100%', width: '100%' }}
                        animation={'fadeIn'}
                        useNativeDriver={true}
                        duration={2000}
                    />
                </View>
                <Animatable.View
                    animation={'fadeIn'}
                    useNativeDriver={true}
                    duration={2000}
                    onAnimationEnd={this.onAnimationEnd}
                >
                    <BaseText
                        text={Localization.translate('appName')}
                        style={{ fontFamily: Fonts.persian.vazirMedium, fontSize: 32 * Dimension.scaleX }}
                    />
                </Animatable.View>
            </View>
        )
    }

    protected onBackPress(): void {}

    private onAnimationEnd = () => {
        NavigationActions.reset(SceneParams.LookingStoreScene.name)
    }
}
