import * as React from 'react'
import { View } from 'react-native'
import { Localization } from '../../text_process/Localization'
import { CommonValidator } from '../../utils/Validator'
import { BaseDialog, IBaseDialogProps, IBaseDialogState } from '../base_dialog/BaseDialog'
import { BaseText } from '../base_text/BaseText'

interface IRequirementDialogState extends IBaseDialogState {
    message: string
    buttonText: string
    // TODO: add other needed properties
}
export class RequirementDialog extends BaseDialog<IBaseDialogProps, IRequirementDialogState> {
    public state: IRequirementDialogState = {
        message: '',
        buttonText: '',
        isVisible: false,
        isCancellable: true
    }
    private onButtonPressedCallback: () => void = null
    public constructor(props: IBaseDialogProps) {
        super(props)
        {
            // Binding methods
            this.show = this.show.bind(this)
            this.hide = this.hide.bind(this)
            this.onPressEvent = this.onPressEvent.bind(this)
        }
    }
    public show(params: {
        title: string
        message: string
        buttonText?: string
        isCancellable?: boolean
        onShow?: () => void
        onDismiss?: () => void
        onButtonPressedCallback?: () => void
    }): void {
        // ok dialog properties
        this.state.message = CommonValidator.isNullOrEmpty(params.message) ? '' : params.message
        this.state.buttonText = params.buttonText ? params.buttonText : Localization.translate('OK')
        this.onButtonPressedCallback = params.onButtonPressedCallback !== null ? params.onButtonPressedCallback : null
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
        return (
            <View>
                <BaseText text={'what a requirement'} />
            </View>
        )
    }
    private onPressEvent(): void {
        this.hide()
        if (this.onButtonPressedCallback != null) {
            this.onButtonPressedCallback()
        }
    }
}
