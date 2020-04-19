import * as React from 'react'
import { KeyboardTypeOptions, TextInput } from 'react-native'
import { Fonts } from '../../GlobalStyles'
import { Localization } from '../../text_process/Localization'
import { TextStandardization } from '../../text_process/TextStandardization'
import { StyleType } from '../../Types'
import { CommonValidator } from '../../utils/Validator'

export interface IEditTextProps {
    style?: StyleType,
    placeHolder?: string,
    onChangeText?: (text: string) => void,
    keyboardType?: KeyboardTypeOptions,
    secureTextEntry?: boolean,
    maxLength?: number,
    multiline?: boolean,
    onFocus?: () => void,
    onBlur?: () => void,
    selectTextOnFocus?: boolean,
    initialText?: string
}

export class EditText extends React.PureComponent<IEditTextProps> {
    public static defaultProps: IEditTextProps = {
        style: null,
        placeHolder: null,
        onChangeText: () => { },
        keyboardType: 'default',
        secureTextEntry: false,
        maxLength: 20,
        multiline: false,
        onFocus: () => { },
        onBlur: () => { },
        selectTextOnFocus: false,
        initialText: ''
    }
    public state = {
        text: ''
    }
    private inputRef: TextInput
    public constructor(props: IEditTextProps) {
        super(props)
        this.setStateText = this.setStateText.bind(this)
        this.getStandardText = this.getStandardText.bind(this)
        this.state.text = this.props.initialText
    }
    public getStandardText(): string {
        return TextStandardization.transformArabic(TextStandardization.transformNumbers(this.state.text))
    }
    public render(): JSX.Element {
        let fontFamily: string = null
        let direction: string = null
        const firstChar = CommonValidator.isNullOrEmpty(this.state.text)
            ? this.props.placeHolder
            : this.state.text
        if (CommonValidator.isPersian(firstChar)) {
            fontFamily = Fonts.persian.vazir
            direction = 'rtl'
        } else {
            fontFamily = Fonts.english.openSansRegular
            direction = 'ltr'
        }
        const style: StyleType = {
            fontFamily,
            direction,
            padding: 0
        }
        const placeholderText = this.props.placeHolder == null
            ? Localization.translate('textInputPlaceHolder')
            : this.props.placeHolder
        return (
            <TextInput
                style={[style, this.props.style]}
                placeholder={placeholderText}
                value={this.state.text}
                onChangeText={this.setStateText}
                keyboardType={this.props.keyboardType}
                secureTextEntry={this.props.secureTextEntry}
                maxLength={this.props.maxLength}
                multiline={this.props.multiline}
                onFocus={this.props.onFocus}
                onBlur={this.props.onBlur}
                selectTextOnFocus={this.props.selectTextOnFocus}
            />
        )
    }
    public setStateText(text: string, runCallback: boolean = true) {
        this.setState({ text }, () => {
            // TODO: for quick fix(bug: texts doesn't have last char) the onChangeText is moved to callback
            // but based on Fakhreddin talks, it suffers from performance problem, better way must be replaced
            if (runCallback) {
                this.props.onChangeText(text)
            }
        })
    }
    public focus = () => {
        this.inputRef.focus()
    }
}
