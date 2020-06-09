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

interface IState {
    fadeValue: Animated.Value
}
export class SplashScreen extends BaseScene<null, IState> {
    public state: IState = {
        fadeValue: new Animated.Value(0)
    }

    protected sceneDidMount() {
        Animated.timing(this.state.fadeValue, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true
        }).start()
    }
    protected renderSafe(): JSX.Element {
        return (
            <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.creamMedium }}
            >
                <Animatable.View animation={'fadeIn'} useNativeDriver={true} duration={2000}>
                    <MaterialIcon name='weekend' size={64 * Dimension.scaleX} color={Colors.primaryMedium} />
                </Animatable.View>
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
