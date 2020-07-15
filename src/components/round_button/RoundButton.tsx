import * as React from 'react'
import { BaseText } from '../base_text/BaseText'
import { SafeTouch } from '../safe_touch/SafeTouch'
import { Styles } from './RoundButtonStyle'

interface IProps {
    onPress: () => void
    text: string
    style?: any
    textStyle?: any
}

export class RoundButton extends React.Component<IProps> {
    public render() {
        return (
            <SafeTouch onPress={this.props.onPress} style={[Styles.root, this.props.style]}>
                <BaseText style={[Styles.text, this.props.textStyle]} text={this.props.text} />
            </SafeTouch>
        )
    }
}
