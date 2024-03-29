import * as React from 'react'
import { Modal, TouchableWithoutFeedback, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { StyleType } from '../../Types'
import { SafeTouch } from '../safe_touch/SafeTouch'
import { Styles } from './BaseDialogStyles'
// tslint:disable-next-line: no-empty-interface
export interface IBaseDialogProps {}

export interface IBaseDialogState {
    isVisible: boolean
    isCancellable: boolean
}

export abstract class BaseDialog<
    PassedProps extends IBaseDialogProps,
    PassedState extends IBaseDialogState
> extends React.PureComponent<PassedProps, PassedState> {
    protected isModalTransparent: boolean = true
    protected contentContainerStyle: StyleType = null
    protected safeTouchStyle: StyleType = null

    public constructor(props: PassedProps) {
        super(props)
        this.onRequestClose = this.onRequestClose.bind(this)
    }
    public render(): JSX.Element {
        const centerContainerStyle = [Styles.contentContainerStyle, this.contentContainerStyle]
        const safeTouchStyle = [Styles.safeTouchStyle, this.safeTouchStyle]
        return (
            <Modal // onDismiss is handled in onRequestClose function
                animationType={'fade'}
                visible={this.state.isVisible}
                transparent={this.isModalTransparent}
                onShow={this.onShow} // Both platforms
                onRequestClose={this.onRequestClose} // Android platform only
            >
                <SafeTouch style={safeTouchStyle} activeOpacity={1} onPress={this.onRequestClose}>
                    <TouchableWithoutFeedback>
                        <Animatable.View useNativeDriver={true} animation='slideInUp' iterationCount={1}>
                            <View style={centerContainerStyle}>{this.renderInside()}</View>
                        </Animatable.View>
                    </TouchableWithoutFeedback>
                </SafeTouch>
            </Modal>
        )
    }

    protected abstract renderInside(): JSX.Element
    protected superShow() {
        this.setState({ isVisible: true })
    }
    protected superHide() {
        this.setState({ isVisible: false })
    }
    protected onRequestClose(): void {
        if (this.state.isCancellable) {
            this.superHide()
            this.onDismiss()
        }
    }
    protected onShow = () => {}
    protected onDismiss = () => {}
}
