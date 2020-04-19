import * as React from 'react'
import {Image, View} from 'react-native'
import { LocalImage, StyleType } from '../../Types'
import { HeaderText } from '../header_text/HeaderText'
import { SafeTouch } from '../safe_touch/SafeTouch'
import {Styles} from './RoundComponentStyles'

interface IRoundComponentProps {
    containerStyle?: StyleType,
    image?: LocalImage,
    imageStyle?: StyleType,
    text?: string,
    textStyle?: StyleType,
    onPress?: () => void,
}

export class RoundComponent extends React.PureComponent<IRoundComponentProps> {
    public static defaultProps: IRoundComponentProps = {
        onPress: () => {}
    }
    public render(): JSX.Element {
        return (
            <SafeTouch
                onPress={this.props.onPress}
            >
                <View
                    style={[
                        Styles.containerStyle,
                        this.props.containerStyle
                    ]}
                >
                    {this.renderContainer()}
                </View>
            </SafeTouch>
        )
    }

    private renderContainer() {
        if (this.props.image) {
            return (
                <Image
                    style={[
                        Styles.imageStyle,
                        this.props.imageStyle
                    ]}
                    source={this.props.image}
                />
            )
        }
        if (this.props.text) {
            return (
                <HeaderText
                    style={[
                        Styles.textStyle,
                        this.props.textStyle
                    ]}
                    text={this.props.text}
                />
            )
        }
        return null
    }

}
