import * as React from 'react'
import {ScrollView, View} from 'react-native'
import { Localization } from '../../text_process/Localization'
import { CommonValidator } from '../../utils/Validator'
import { BaseDialog, IBaseDialogProps, IBaseDialogState } from '../base_dialog/BaseDialog'
import { BaseText } from '../base_text/BaseText'
import { NormalButton } from '../normal_button/NormalButton'
import {Styles} from './OkDialogStyles'

interface IOkDialogState extends IBaseDialogState {
    title: string,
    message: string,
    buttonText: string,
}

export class OkDialog extends BaseDialog<IBaseDialogProps, IOkDialogState> {
    public state: IOkDialogState = {
        title: '',
        message: '',
        buttonText: '',
        isVisible: false,
        isCancellable: true
    }
    protected centerContainerStyle =  Styles.centerContainerStyle
    private onOkButtonPressedCallback: () => void = null
    public constructor(props: IBaseDialogProps) {
        super(props)
        {// Binding methods
            this.show = this.show.bind(this)
            this.hide = this.hide.bind(this)
            this.onPressEvent = this.onPressEvent.bind(this)
        }
    }
    public show(params: {
        title: string,
        message: string,
        buttonText?: string,
        isCancellable?: boolean,
        onShow?: () => void
        onDismiss?: () => void
        onOkButtonPressedCallback?: () => void
    }): void {
        // ok dialog properties
        this.state.title = CommonValidator.isNullOrEmpty(params.title) ? '' : params.title
        this.state.message = CommonValidator.isNullOrEmpty(params.message) ? '' : params.message
        this.state.buttonText = params.buttonText ? params.buttonText : Localization.translate('OK')
        this.onOkButtonPressedCallback = params.onOkButtonPressedCallback !== null
            ? params.onOkButtonPressedCallback
            : () => {}
        // base dialog properties
        this.state.isCancellable = params.isCancellable ? params.isCancellable : true
        this.onShow = params.onShow ? params.onShow : () => {}
        this.onDismiss = params.onDismiss ? params.onDismiss : () => {}
        this.superShow()
    }
    public hide() {
        this.superHide()
    }
    protected renderInside(): JSX.Element {
        // this is used to divide ReactNative Touchable and ScrollView Touching
        const onStartShouldSetResponder = () => true
        return (
            <View style={Styles.mainContainerStyle}>
                <BaseText
                    style={Styles.titleStyle}
                    text={this.state.title}
                />
                <View style={Styles.messageContainerStyle}>
                    <ScrollView>
                        <View onStartShouldSetResponder={onStartShouldSetResponder}>
                            <BaseText
                                style={Styles.messageTextStyle}
                                text={this.state.message}
                            />
                        </View>
                    </ScrollView>
                </View>
                <View style={Styles.buttonsSpacer}/>
                <View style={Styles.buttonContainerStyle}>
                    <NormalButton
                        onPress={this.onPressEvent}
                        text={this.state.buttonText}
                        isFilled={false}
                    />
                </View>
            </View>
        )
    }
    private onPressEvent(): void {
        this.hide()
        if (this.onOkButtonPressedCallback != null) {
            this.onOkButtonPressedCallback()
        }
    }
}
