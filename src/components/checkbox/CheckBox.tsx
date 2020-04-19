import * as React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { SafeTouch } from '../safe_touch/SafeTouch'
import { Styles } from './CheckBoxStyles'

interface ICheckBoxProps {
    value: boolean,
    onPress?: () => void,
    color?: string
}
export class CheckBox extends React.PureComponent<ICheckBoxProps> {
    public render(): JSX.Element {
        const borderColorStyle = { borderColor: this.props.color }
        const icon = this.props.value ?
            (
                <Icon
                    name={'check'}
                    size={14}
                    color={this.props.color}
                />
            ) : null
        return (
            <SafeTouch
                style={Styles.safeTouch}
                onPress={this.props.onPress}
            >
                <View style={[Styles.checkBoxContainer, borderColorStyle]}>
                    {icon}
                </View>
            </SafeTouch >
        )
    }
}
