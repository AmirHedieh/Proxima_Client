import * as React from 'react'
import { Image, View } from 'react-native'
import { BaseText } from '../base_text/BaseText'
import { Styles } from './PictureCardStyles'

interface IPictureCardProps {
    SubProductTypeName: string
    width: number
    height: number
    imageSource: any
    sellTypeStyleBackgroundColor: string
    sellType: string
    isTender: boolean
    subProductTypographicColor: string
    subProductTypographicBackgroundColor: string
}

export class PictureCard extends React.PureComponent<IPictureCardProps> {
    public static defaultProps: IPictureCardProps = {
        SubProductTypeName: '',
        width: 0,
        height: 0,
        imageSource: '',
        sellTypeStyleBackgroundColor: '',
        sellType: '',
        isTender: null,
        subProductTypographicColor: '',
        subProductTypographicBackgroundColor: ''
    }

    public render(): JSX.Element {

        const sellTypeStyle = { backgroundColor: this.props.sellTypeStyleBackgroundColor, width: this.props.width }
        const imageStyle = { width: this.props.width, height: this.props.height }
        return (
            <View style={Styles.imageView}>
                {this.props.isTender
                    ? this.renderTenderImage()
                    : (<Image
                        source={this.props.imageSource}
                        style={[Styles.image, imageStyle]}
                    />)}

                <BaseText
                    text={this.props.sellType}
                    style={[Styles.typeText, sellTypeStyle]}
                />
            </View>
        )
    }
    private renderTenderImage(): JSX.Element {
        const subProductTypographicStyle = {
            width: this.props.width,
            height: this.props.height,
            color: this.props.subProductTypographicColor,
            backgroundColor: this.props.subProductTypographicBackgroundColor
        }
        return (
            <BaseText
                text={this.props.SubProductTypeName}
                style={[Styles.subProductTypographic, subProductTypographicStyle]}
            />

        )

    }
}
