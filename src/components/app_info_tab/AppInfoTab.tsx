import * as React from 'react'
import { Animated, Image, View } from 'react-native'
import { GlobalStyles } from '../../GlobalStyles'
import { AppInfoCard } from '../../RFC/AppInfoCard/AppInfoCard'
import { StaticImages } from '../../StaticImages'
import { SafeTouch } from '../safe_touch/SafeTouch'
import { collapsedTabHeight, fullTabHeight, Styles } from './AppInfoTabStyles'

interface IState {
    isExpanded: boolean
    value: Animated.Value
}

export class AppInfoTab extends React.Component<{}, IState> {
    public transformYDifference: number = -(fullTabHeight - collapsedTabHeight)
    public state: IState = {
        isExpanded: false,
        value: new Animated.Value(this.transformYDifference)
    }

    public render(): JSX.Element {
        return (
            <Animated.View style={[Styles.root, { translateY: this.state.value }]}>
                <AppInfoCard />
                <View style={GlobalStyles.spacer} />
                <SafeTouch style={Styles.safeTouch} onPress={this.onPress}>
                    {this.state.isExpanded ? (
                        <Image source={StaticImages.upArrow} />
                    ) : (
                        <Image style={Styles.logoImage} source={StaticImages.logoTransparent} />
                    )}
                </SafeTouch>
            </Animated.View>
        )
    }

    private onPress = () => {
        this.setState(
            {
                isExpanded: !this.state.isExpanded
            },
            () => {
                Animated.timing(this.state.value, {
                    toValue: this.state.isExpanded ? 0 : this.transformYDifference,
                    duration: 800,
                    useNativeDriver: true
                }).start()
            }
        )
    }
}
