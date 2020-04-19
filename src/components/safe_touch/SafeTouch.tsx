import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import { StyleType } from '../../Types'
import { Styles } from './SafeTouchStyles'

interface ISafeTouchProps {
    onPress: () => void
    onLongPress?: () => void
    onPressIn?: () => void
    onPressOut?: () => void,
    activeOpacity?: number,
    disabled?: boolean,
    style?: StyleType
}

export class SafeTouch extends React.PureComponent<ISafeTouchProps> {
    public static defaultProps: ISafeTouchProps = {
        onPress: () => { },
        onLongPress: () => { },
        onPressIn: () => { },
        onPressOut: () => { },
        disabled: false,
        style: null
    }
    private isTouchValid: boolean = true
    private touchTimeout: any = null
    public constructor(props: ISafeTouchProps) {
        super(props)
        {// Binding methods
            this.onPressEvent = this.onPressEvent.bind(this)
        }
    }
    public render(): JSX.Element {
        return (
            <TouchableOpacity
                onPress={this.onPressEvent}
                onLongPress={this.props.onLongPress}
                onPressIn={this.props.onPressIn}
                onPressOut={this.props.onPressOut}
                activeOpacity={this.props.activeOpacity}
                disabled={this.props.disabled}
                style={[Styles.container, this.props.style]}
            >
                {
                    this.props.children
                }
            </TouchableOpacity>
        )
    }
    public componentWillUnmount() {
        this.clearTimeoutIfExists()
    }
    private onPressEvent(): void {
        requestAnimationFrame(() => {
            if (this.isTouchValid === false) {
                return
            }
            this.isTouchValid = false
            this.clearTimeoutIfExists()
            this.touchTimeout = setTimeout(() => {
                this.isTouchValid = true
            }, 300)
            if (typeof this.props.onPress === 'function') {
                this.props.onPress()
            }
        })
    }
    private clearTimeoutIfExists(): void {
        if (this.touchTimeout != null) {
            clearTimeout(this.touchTimeout)
            this.touchTimeout = null
        }
    }
}
