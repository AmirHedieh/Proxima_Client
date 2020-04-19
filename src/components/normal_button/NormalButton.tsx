import * as React from 'react'
import { FontSizes } from '../../GlobalStyles'
import { StyleType } from '../../Types'
import { HeaderText } from '../header_text/HeaderText'
import { SafeTouch } from '../safe_touch/SafeTouch'
import { Styles } from './NormalButtonStyle'

interface INormalButtonProps {
    onPress: any
    text: string
    isFilled?: boolean,
    disabled?: boolean,
    containerStyle?: StyleType,
    fontSize?: number,
    width?: number | string,
    height?: number | string,
    textStyle?: StyleType
}

export class NormalButton extends React.PureComponent<INormalButtonProps> {
    public static defaultProps: INormalButtonProps = {
        onPress: () => { },
        text: '',
        isFilled: true,
        disabled: false,
        containerStyle: null,
        fontSize: FontSizes.h3,
        width: null,
        height: null,
        textStyle: null
    }

    public render(): JSX.Element {
        const extraStyle: StyleType = {}
        if (this.props.width != null) {
            extraStyle.width = this.props.width
        }
        if (this.props.height != null) {
            extraStyle.height = this.props.height
        }
        return (
            <SafeTouch
                onPress={this.props.onPress}
                disabled={this.props.disabled}
                style={[
                    Styles.containerStyle,
                    this.props.isFilled ? Styles.filledButtonContainerStyle : Styles.notFilledButtonContainerStyle,
                    this.props.containerStyle,
                    this.props.disabled ? Styles.disabledStyle : null,
                    extraStyle
                ]}
            >
                <HeaderText
                    text={this.props.text}
                    style={[
                        Styles.textStyle,
                        this.props.isFilled ? Styles.filledButtonTextStyle : Styles.notFilledButtonTextStyle,
                        this.props.textStyle
                    ]}
                    fontSize={this.props.fontSize}
                />
            </SafeTouch>
        )
    }
}
