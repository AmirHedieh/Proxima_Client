import * as React from 'react'
import { ScrollView, View } from 'react-native'
import { CommonValidator } from '../../utils/Validator'
import { BaseDialog, IBaseDialogProps, IBaseDialogState } from '../base_dialog/BaseDialog'
import { BaseText } from '../base_text/BaseText'
import { NormalButton } from '../normal_button/NormalButton'
import { RTLAwareView } from '../rtl_aware/RTLAwareView'
import { Styles } from './YesNoDialogStyles'

interface IYesNoDialogState extends IBaseDialogState {
    title: string
    message: string
    noButtonText: string
    yesButtonText: string
}

export class YesNoDialog extends BaseDialog<IBaseDialogProps, IYesNoDialogState> {
    public state: IYesNoDialogState = {
        title: '',
        message: '',
        noButtonText: '',
        yesButtonText: '',
        isVisible: false,
        isCancellable: true
    }
    private onNoButtonPressCallback: () => void = null
    private onYesButtonPressedCallback: () => void = null

    constructor(props: IBaseDialogProps) {
        super(props)
        this.contentContainerStyle = Styles.centerContainerStyle
        this.show = this.show.bind(this)
        this.hide = this.hide.bind(this)
    }

    public show(params: {
        title: string
        message: string
        noButtonText: string
        yesButtonText: string
        isCancellable?: boolean
        onShow?: () => void
        onDismiss?: () => void
        onNoButtonPressedCallback?: () => void
        onYesButtonPressedCallback?: () => void
    }): void {
        // yesNo dialog properties
        this.state.title = CommonValidator.isNullOrEmpty(params.title) ? '' : params.title
        this.state.message = CommonValidator.isNullOrEmpty(params.message) ? '' : params.message
        this.state.noButtonText = CommonValidator.isNullOrEmpty(params.noButtonText) ? '' : params.noButtonText
        this.state.yesButtonText = CommonValidator.isNullOrEmpty(params.yesButtonText) ? '' : params.yesButtonText
        this.onNoButtonPressCallback =
            params.onNoButtonPressedCallback != null ? params.onNoButtonPressedCallback : null
        this.onYesButtonPressedCallback =
            params.onYesButtonPressedCallback != null ? params.onYesButtonPressedCallback : null
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
        const onYesButtonPressed = () => this.onPressEvent(true)
        const onNoButtonPressed = () => this.onPressEvent(false)
        // this is used to divide ReactNative Touchable and ScrollView Touching
        const onStartShouldSetResponder = () => true
        return (
            <View style={Styles.mainContainerStyle}>
                <BaseText style={Styles.titleStyle} text={this.state.title} />
                <View style={Styles.messageContainerStyle}>
                    <ScrollView>
                        <View onStartShouldSetResponder={onStartShouldSetResponder}>
                            <BaseText style={Styles.messageTextStyle} text={this.state.message} />
                        </View>
                    </ScrollView>
                </View>
                <View style={Styles.buttonsSpacer} />
                <View style={Styles.buttonsContainerStyle}>
                    <RTLAwareView reverseJustifyContent={true}>
                        <NormalButton onPress={onYesButtonPressed} text={this.state.yesButtonText} isFilled={false} />
                        <NormalButton onPress={onNoButtonPressed} text={this.state.noButtonText} isFilled={false} />
                    </RTLAwareView>
                </View>
            </View>
        )
    }
    private onPressEvent(isYes: boolean) {
        this.hide()
        if (isYes) {
            if (this.onYesButtonPressedCallback != null) {
                this.onYesButtonPressedCallback()
            }
        } else {
            if (this.onNoButtonPressCallback != null) {
                this.onNoButtonPressCallback()
            }
        }
    }
}
