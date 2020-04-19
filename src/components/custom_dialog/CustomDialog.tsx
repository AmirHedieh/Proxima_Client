import * as React from 'react'
import { ScrollView, View } from 'react-native'
import { CommonValidator } from '../../utils/Validator'
import { BaseDialog, IBaseDialogProps, IBaseDialogState } from '../base_dialog/BaseDialog'
import { BaseText } from '../base_text/BaseText'
import { Styles } from './CustomDialogStyles'

interface ICustomDialogState extends IBaseDialogState {
    title: string,
    content: JSX.Element,
}

export class CustomDialog extends BaseDialog<IBaseDialogProps, ICustomDialogState> {
    public state: ICustomDialogState = {
        title: '',
        content: null,
        isVisible: false,
        isCancellable: true
    }
    protected centerContainerStyle = Styles.centerContainerStyle
    private width: number
    private height: number
    public show(params: {
        title: string,
        content: JSX.Element,
        width: number,
        height: number,
        isCancellable?: boolean,
        onShow?: () => void
        onDismiss?: () => void
    }): void {
        // custom dialog properties
        this.state.title = CommonValidator.isNullOrEmpty(params.title) ? '' : params.title
        this.state.content = params.content ? params.content : null
        this.width = params.width ? params.width : null
        this.height = params.height ? params.height : null
        // base dialog properties
        this.state.isCancellable = params.isCancellable ? params.isCancellable : true
        this.onShow = params.onShow ? params.onShow : () => { }
        this.onDismiss = params.onDismiss ? params.onDismiss : () => { }
        this.superShow()
    }
    public hide() {
        this.superHide()
    }
    protected renderInside(): JSX.Element {
        // this is used to divide ReactNative Touchable and ScrollView Touching
        const onStartShouldSetResponder = () => true
        return (
            <View style={[Styles.mainContainerStyle, { width: this.width, height: this.height }]}>
                <BaseText
                    style={Styles.titleStyle}
                    text={this.state.title}
                />
                <ScrollView>
                    <View onStartShouldSetResponder={onStartShouldSetResponder}>
                        {this.state.content}
                    </View>
                </ScrollView>
            </View>
        )
    }
}
