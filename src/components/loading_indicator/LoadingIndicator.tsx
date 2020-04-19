import LottieView = require('lottie-react-native')
import * as React from 'react'
import { View } from 'react-native'
import { Dimension } from '../../GlobalStyles'

const Animation = require('resources/animations/51-preloader.json')

interface IProps {
    size?: number
}
export class LoadingIndicator extends React.Component<IProps> {
    public static defaultProps: IProps = {
        size: 96 * Dimension.scaleX
    }
    public render(): JSX.Element {
        const style = {
            width: this.props.size,
            height: this.props.size * 0.7
        }
        return (
            <View style={style}>
                <LottieView
                    source={Animation}
                    autoPlay={true}
                    loop={true}
                    hardwareAccelerationAndroid={true}
                    resizeMode={'contain'}
                />
            </View>
        )
    }
}
