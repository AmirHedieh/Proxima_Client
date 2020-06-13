import * as React from 'react'
import { View, Animated } from 'react-native'
import * as Animatable from 'react-native-animatable'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { BaseText } from '../../../components/base_text/BaseText'
import { BaseScene } from '../../base_scene/BaseScene'
import { Colors } from '../../../Constants'
import { Fonts, Dimension } from '../../../GlobalStyles'
import { NavigationActions } from '../../../NavigationActions'
import { SceneParams } from '../../../SceneParams'

const image = require('../../../resources/images/logo_trans.png')
export class SplashScreen extends BaseScene<null, null> {
    protected renderSafe(): JSX.Element {
        return (
            <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.creamMedium }}
            >
                <Animatable.Image
                    source={image}
                    style={{ width: 196 * Dimension.scaleX, height: 196 * Dimension.scaleX }}
                    animation={'fadeIn'}
                    useNativeDriver={true}
                    duration={2000}
                />
                <Animatable.View
                    animation={'fadeIn'}
                    useNativeDriver={true}
                    duration={2000}
                    onAnimationEnd={() => NavigationActions.reset(SceneParams.HomeScene.name)}
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
