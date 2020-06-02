import * as React from 'react'
import { View } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../../Constants'
import { Dimension, GlobalStyles } from '../../GlobalStyles'
import { CommonValidator } from '../../utils/Validator'
import { BaseDialog, IBaseDialogProps, IBaseDialogState } from '../base_dialog/BaseDialog'
import { BaseText } from '../base_text/BaseText'
import { NormalButton } from '../normal_button/NormalButton'
import { RTLAwareView } from '../rtl_aware/RTLAwareView'
import { Styles } from './RequirementDialogStyles'

interface IRequirementDialogState extends IBaseDialogState {
    message: string
    icon: string
    buttonText: string
    onButtonPressedCallback: () => void
    // TODO: add other needed properties
}
export class RequirementDialog extends BaseDialog<IBaseDialogProps, IRequirementDialogState> {
    public state: IRequirementDialogState = {
        message: '',
        icon: null,
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
        icon: string
        buttonText?: string
        isCancellable?: boolean
        onButtonPressedCallback?: () => void
    }): void {
        this.setState({
            message: CommonValidator.isNullOrEmpty(params.message) ? '' : params.message,
            icon: params.icon,
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
            <View style={Styles.container}>
                <RTLAwareView style={Styles.messageContainer}>
                    <BaseText style={Styles.messageText} text={this.state.message} />
                    <View style={GlobalStyles.spacer} />
                    <MaterialIcon name='error-outline' size={36 * Dimension.scaleX} color={Colors.red} />
                </RTLAwareView>
                {this.state.buttonText !== '' && (
                    <View style={Styles.buttonContainer}>
                        <View style={{ height: 24 * Dimension.scaleX }} />
                        <NormalButton text={this.state.buttonText} onPress={this.onPressEvent}>
                            {this.state.buttonText && (
                                <MaterialIcon
                                    name={this.state.icon}
                                    size={22 * Dimension.scaleX}
                                    color={Colors.creamMedium2}
                                />
                            )}
                        </NormalButton>
                        <View style={{ height: 28 * Dimension.scaleX }} />
                    </View>
                )}
                <View style={Styles.bottomContainer}>
                    <View style={Styles.iconContainer}>
                        <MaterialIcon name={this.state.icon} size={80 * Dimension.scaleX} color={Colors.creamMedium2} />
                    </View>
                </View>
            </View>
        )
    }
    private onPressEvent(): void {
        if (this.state.onButtonPressedCallback) {
            this.state.onButtonPressedCallback()
        }
    }
}
