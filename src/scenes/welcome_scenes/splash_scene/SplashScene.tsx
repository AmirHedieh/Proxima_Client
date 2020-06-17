import * as React from 'react'
import { View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { BaseText } from '../../../components/base_text/BaseText'
import { Colors, GlobalStaticData } from '../../../Constants'
import { Dimension, Fonts } from '../../../GlobalStyles'
import { NavigationActions } from '../../../NavigationActions'
import { SceneParams } from '../../../SceneParams'
import { StaticImages } from '../../../StaticImages'
import { BaseScene } from '../../base_scene/BaseScene'

export class SplashScreen extends BaseScene<null, null> {
    protected renderSafe(): JSX.Element {
        return (
            <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.creamMedium }}
            >
                <Animatable.Image
                    source={StaticImages.logoTransparent}
                    style={{ width: 199 * Dimension.scaleX, height: 196 * Dimension.scaleX }}
                    animation={'fadeIn'}
                    useNativeDriver={true}
                    duration={GlobalStaticData.initialDuration}
                />
                <Animatable.View
                    animation={'fadeIn'}
                    useNativeDriver={true}
                    duration={GlobalStaticData.initialDuration}
                    onAnimationEnd={() => NavigationActions.reset(SceneParams.LookingStoreScene.name)}
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
}
