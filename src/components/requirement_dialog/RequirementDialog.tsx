import * as React from 'react'
import { View } from 'react-native'
import { CommonValidator } from '../../utils/Validator'
import { BaseDialog, IBaseDialogProps, IBaseDialogState } from '../base_dialog/BaseDialog'
import { BaseText } from '../base_text/BaseText'
import { NormalButton } from '../normal_button/NormalButton'

interface IRequirementDialogState extends IBaseDialogState {
    message: string
    buttonText: string
    onButtonPressedCallback: () => void
    // TODO: add other needed properties
}
export class RequirementDialog extends BaseDialog<IBaseDialogProps, IRequirementDialogState> {
    public state: IRequirementDialogState = {
        message: '',
        buttonText: '',
        onButtonPressedCallback: null,
        isVisible: false,
        isCancellable: false
    }
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
        message: string
        buttonText?: string
        isCancellable?: boolean
        onButtonPressedCallback?: () => void
    }): void {
        this.setState({
            message: CommonValidator.isNullOrEmpty(params.message) ? '' : params.message,
            buttonText: params.buttonText ? params.buttonText : '',
            onButtonPressedCallback: params.onButtonPressedCallback !== null ? params.onButtonPressedCallback : null
        })
        this.superShow()
    }
    public hide() {
        this.superHide()
    }
    protected renderInside(): JSX.Element {
        return (
            <View>
                <BaseText text={this.state.message} />
                {this.state.buttonText !== '' && (
                    <NormalButton text={this.state.buttonText} onPress={this.onPressEvent} />
                )}
            </View>
        )
    }
    private onPressEvent(): void {
        if (this.state.onButtonPressedCallback != null) {
            this.state.onButtonPressedCallback()
        }
    }
}
