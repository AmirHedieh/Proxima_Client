import * as React from 'react'
import { ImageBackground } from 'react-native'
import { BaseText } from '../base_text/BaseText'
import { SafeTouch } from '../safe_touch/SafeTouch'
import { Styles } from './ImageBoxStyles'

interface IImageBoxProps {
    onClosePress: () => void,
    uri: string
}

export class ImageBox extends React.PureComponent<IImageBoxProps> {
    public static defaultProps: IImageBoxProps = {
        onClosePress: () => {},
        uri: null
    }

    public render(): JSX.Element {
        return (
                <ImageBackground
                    style={Styles.imageContainer}
                    imageStyle={Styles.image}
                    source={{ uri: this.props.uri }}
                >
                    <SafeTouch
                        style={Styles.closeSafeTouch}
                        onPress={this.props.onClosePress}
                    >
                        <BaseText text='x' style={Styles.closeText}/>
                    </SafeTouch>
                </ImageBackground>
        )
    }
}
