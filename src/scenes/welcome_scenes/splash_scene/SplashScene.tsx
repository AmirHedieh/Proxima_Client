import * as React from 'react'
import { View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { BaseText } from '../../../components/base_text/BaseText'
import { Colors, GlobalStaticData } from '../../../Constants'
import { Dimension, Fonts } from '../../../GlobalStyles'
import { stores } from '../../../mobx/RootStore'
import { NavigationActions } from '../../../NavigationActions'
import { SceneParams } from '../../../SceneParams'
import { StaticImages } from '../../../StaticImages'
import { BaseScene } from '../../base_scene/BaseScene'

export class SplashScreen extends BaseScene<null, null> {
    public componentWillUnmount() {
        stores.AppState.init() // init app engine
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
                        duration={GlobalStaticData.initialDuration}
                    />
                </View>
                <Animatable.View
                    animation={'fadeIn'}
                    useNativeDriver={true}
                    duration={GlobalStaticData.initialDuration}
                    onAnimationEnd={this.onAnimationEnd}
                >
                    <BaseText
                        text='پراکسیما'
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
