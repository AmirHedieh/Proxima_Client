import * as React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Dimension } from '../../GlobalStyles'
import { StyleType } from '../../Types'
import { SafeTouch } from '../safe_touch/SafeTouch'
import { Styles } from './FloatingButtonStyles'

interface IFloatingButtonProps {
    onPress: () => void
    icon?: string
    style?: StyleType
}

export class FloatingButton extends React.PureComponent<IFloatingButtonProps> {
    public static defaultProps: IFloatingButtonProps = {
        onPress: () => { },
        icon: 'plus'
    }

    public render(): JSX.Element {
        const style = [Styles.Button, this.props.style]
        return (
            <SafeTouch
                onPress={this.props.onPress}
                style={style}
            >
                <Icon
                    name={this.props.icon}
                    size={20 * Dimension.scaleX}
                    {...Styles.icon}
                />
            </SafeTouch>
        )
    }
}
