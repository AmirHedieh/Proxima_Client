import * as React from 'react'
import { Colors } from '../../Constants'
import { FontSizes } from '../../GlobalStyles'
import { StyleType } from '../../Types'
import { BaseText } from '../base_text/BaseText'

interface IHeaderTextProps {
    text: string
    style?: StyleType
    color?: string
    fontSize?: number
}

export class HeaderText extends React.PureComponent<IHeaderTextProps> {
    public static defaultProps: IHeaderTextProps = {
        text: '',
        style: null,
        color: Colors.grayContent,
        fontSize: FontSizes.h3
    }

    public render(): JSX.Element {
        const style: StyleType = {
            fontSize: this.props.fontSize,
            color: this.props.color
        }
        return (
            <BaseText
                text={this.props.text}
                style={[style , this.props.style]}
            />
        )
    }
}
