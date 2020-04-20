const LottieView = require('lottie-react-native')
import * as React from 'react'
import {BaseDialog, IBaseDialogProps, IBaseDialogState} from '../base_dialog/BaseDialog'
import {Styles} from './LoadingDialogStyles'

const Animation = require('resources/animations/51-preloader.json')

export class LoadingDialog extends BaseDialog <IBaseDialogProps, IBaseDialogState> {

    public state: IBaseDialogState = {
        isVisible: false,
        isCancellable: false
    }
    public constructor(props: IBaseDialogProps) {
        super(props)
        this.centerContainerStyle =  Styles.centerContainerStyle
    }
    public show = () => {
        this.superShow()
    }
    public hide = () => {
        this.superHide()
    }

    protected onRequestClose(): void {
    }

    protected renderInside(): JSX.Element {
        return (
            <LottieView
                source={Animation}
                autoPlay={true}
                loop={true}
                hardwareAccelerationAndroid={true}
                resizeMode={'contain'}
            />
        )
    }
}
