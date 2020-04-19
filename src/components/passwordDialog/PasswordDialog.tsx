import * as React from 'react'
import {View} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { PasswordStorage } from '../../storage/PasswordStorage'
import { Localization } from '../../text_process/Localization'
import { BaseDialog, IBaseDialogProps, IBaseDialogState } from '../base_dialog/BaseDialog'
import { BaseText } from '../base_text/BaseText'
import { EditText } from '../edit_text/EditText'
import { LabeledContainer } from '../labeled_container/LabeledContainer'
import { NormalButton } from '../normal_button/NormalButton'
import { SafeTouch } from '../safe_touch/SafeTouch'
import {Styles} from './PasswordDialogStyles'

interface IPasswordDialogState extends IBaseDialogState {
    isShowingPassword: boolean,
    errorMessage: string
}

export class PasswordDialog extends BaseDialog<IBaseDialogProps, IPasswordDialogState> {
    public state: IPasswordDialogState = {
        isShowingPassword: false,
        errorMessage: '',
        isVisible: false,
        isCancellable: true
    }

    protected centerContainerStyle =  Styles.centerContainerStyle
    private passwordEditTextRef: EditText = null
    /**
     * gets called when user enters correct password
     */
    private onProceed: () => void = null

    public constructor(props: IBaseDialogProps) {
        super(props)
        {// Binding methods
            this.show = this.show.bind(this)
            this.hide = this.hide.bind(this)
            this.onPressEvent = this.onPressEvent.bind(this)
        }
    }
    public show(params: {
        onProceed: () => void,
        onShow?: () => void
        onDismiss?: () => void
    }): void {
        this.onProceed = params.onProceed ? params.onProceed : () => {}
        this.onShow = params.onShow ? params.onShow : () => {}
        this.onDismiss = params.onDismiss ? params.onDismiss : () => {}
        this.superShow()
    }
    public hide() {
        this.superHide()
    }
    protected renderInside(): JSX.Element {
        const icon = this.state.isShowingPassword ?
            (
                <Icon
                    name={'eye-slash'}
                    size={20}
                />
            ) : (
                    <Icon
                        name={'eye'}
                        size={20}
                    />
                )
        // this is used to divide ReactNative Touchable and ScrollView Touching
        const title = Localization.translate('titlePasswordDialog')
        const message = Localization.translate('messagePasswordDialog')
        const buttonText = Localization.translate('buttonPasswordDialog')
        const onShowPasswordIconTouch = () => this.setState({ isShowingPassword: !this.state.isShowingPassword})
        return (
            <View style={Styles.mainContainerStyle}>
                <BaseText
                    style={Styles.titleStyle}
                    text={title}
                />
                <View style={Styles.headerSpacer}/>
                <View style={{width: '100%', alignItems: 'center'}}>
                    <LabeledContainer
                        labelText={message}
                        errorText={this.state.errorMessage}
                    >
                        <View style={Styles.iconEditTextView}>
                            <SafeTouch
                                style={Styles.showPasswordSafeTouch}
                                onPress={onShowPasswordIconTouch}
                            >
                                {icon}
                            </SafeTouch>
                            <EditText
                                onChangeText={this.onPasswordTextChange}
                                ref={(ref) => this.passwordEditTextRef = ref}
                                style={Styles.passwordEditText}
                                maxLength={25}
                                placeHolder={'********'}
                                secureTextEntry={!this.state.isShowingPassword}
                            />
                        </View>
                    </LabeledContainer>
                </View>
                <View style={Styles.buttonsSpacer}/>
                <View style={Styles.buttonContainerStyle}>
                    <NormalButton
                        containerStyle={Styles.button}
                        onPress={this.onPressEvent}
                        text={buttonText}
                        isFilled={false}
                    />
                </View>
            </View>
        )
    }
    private onPasswordTextChange = () => {
        this.setState({
            errorMessage: ''
        })
    }
    private async onPressEvent(): Promise<void> {
        const password = await PasswordStorage.get()
        if (this.passwordEditTextRef.getStandardText() === password) {
            this.onProceed()
            this.hide()
        } else {
            this.setState({
                errorMessage: Localization.translate('wrongPasswordMessagePasswordDialog')
            })
        }
    }
}
