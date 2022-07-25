import * as React from 'react'
import { Text } from 'react-native'
import { Fonts, FontSizes } from '../../GlobalStyles'
import { StyleType } from '../../Types'
import { CommonValidator } from '../../utils/Validator'
import { Colors } from '../../Constants'

interface IBaseTextProps {
    text: string
    style?: StyleType
    numberOfLine: number
}

export class BaseText extends React.PureComponent<IBaseTextProps> {
    public static defaultProps: IBaseTextProps = {
        text: '',
        style: null,
        numberOfLine: null
    }
    public render(): JSX.Element {
        const firstChar = this.props.text !== '' && this.props.text != null ? this.props.text[0] : 'ا'
        const fontFamily = CommonValidator.isPersian(firstChar) ? Fonts.persian.vazir : Fonts.english.openSansRegular
        const fontSize = FontSizes.h3
        const color = Colors.primaryMedium
        const style = [{ fontFamily, fontSize, color }, this.props.style]
        return <Text numberOfLines={this.props.numberOfLine} style={style}>{String(this.props.text)}</Text>
    }
}
