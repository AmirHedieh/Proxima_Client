import * as React from 'react'
import { View } from 'react-native'
import { BaseText } from '../base_text/BaseText'
import { Styles } from './MessageBarStyles'

interface IProps {
    message: string
}
export class MessageBar extends React.PureComponent<IProps> {
    public render(): JSX.Element {
        return (
            <View style={Styles.container}>
                <BaseText
                    text={this.props.message}
                />
            </View>
        )
    }
}
