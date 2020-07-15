import * as React from 'react'
import { Image, ScrollView, View } from 'react-native'
import { GlobalStyles } from '../../GlobalStyles'
import { Localization } from '../../text_process/Localization'
import { CommonValidator } from '../../utils/Validator'
import { BaseDialog, IBaseDialogProps, IBaseDialogState } from '../base_dialog/BaseDialog'
import { BaseText } from '../base_text/BaseText'
import { NormalButton } from '../normal_button/NormalButton'
import { Styles } from './OkDialogStyles'

interface IOkDialogState extends IBaseDialogState {
    title: string
    message: string
    imageUrl: string
    buttonText: string
}

export class OkDialog extends BaseDialog<IBaseDialogProps, IOkDialogState> {
    public state: IOkDialogState = {
        title: '',
        message: '',
        imageUrl: null,
        buttonText: '',
        isVisible: false,
        isCancellable: true
    }
    private onOkButtonPressedCallback: () => void = null
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
        imageUrl?: string
        buttonText?: string
        isCancellable?: boolean
        onShow?: () => void
        onDismiss?: () => void
        onOkButtonPressedCallback?: () => void
    }): void {
        console.log('image URL', params.imageUrl)
        // ok dialog properties
        this.state.title = CommonValidator.isNullOrEmpty(params.title) ? '' : params.title
        this.state.message = CommonValidator.isNullOrEmpty(params.message) ? '' : params.message
        this.state.imageUrl = CommonValidator.isNullOrEmpty(params.imageUrl) ? null : params.imageUrl
        this.state.buttonText = params.buttonText ? params.buttonText : Localization.translate('OK')
        this.onOkButtonPressedCallback =
            params.onOkButtonPressedCallback !== null ? params.onOkButtonPressedCallback : () => {}
        // base dialog properties
        this.state.isCancellable = params.isCancellable ? params.isCancellable : true
        this.onShow = params.onShow ? params.onShow : () => {}
        this.onDismiss = params.onDismiss ? params.onDismiss : () => {}
        // set base dialog style
        this.contentContainerStyle = CommonValidator.isNullOrEmpty(params.imageUrl)
            ? Styles.baseDialogNoImage
            : Styles.baseDialogWithImage
        this.superShow()
    }
    public hide() {
        this.superHide()
    }
    protected renderInside(): JSX.Element {
        // this is used to divide ReactNative Touchable and ScrollView Touching
        const onStartShouldSetResponder = () => true
        return (
            <View style={Styles.root}>
                <BaseText style={Styles.titleStyle} text={this.state.title} />
                <View style={this.state.imageUrl ? Styles.centerContainerWithImage : Styles.centerContainerNoImage}>
                    <ScrollView>
                        <View onStartShouldSetResponder={onStartShouldSetResponder}>
                            <BaseText style={Styles.messageTextStyle} text={this.state.message} />
                        </View>
                    </ScrollView>
                </View>
                {this.state.imageUrl && (
                    <View>
                        <View style={GlobalStyles.mediumSpacer} />
                        <Image style={Styles.image} source={{ uri: this.state.imageUrl }} />
                    </View>
                )}
                <View style={this.state.imageUrl ? GlobalStyles.mediumSpacer : GlobalStyles.smallSpacer} />
                <View style={Styles.buttonContainerStyle}>
                    <NormalButton onPress={this.onPressEvent} text={this.state.buttonText} />
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
