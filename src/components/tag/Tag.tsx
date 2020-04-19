import * as React from 'react'
import Icon from 'react-native-vector-icons/AntDesign'
import { BaseText } from '../base_text/BaseText'
import { SafeTouch } from '../safe_touch/SafeTouch'
import { Styles } from './TagStyle'

export interface ITagProps {
    onPress: any
    text: string
}

export class Tag extends React.PureComponent<ITagProps> {
    public static defaultProps: ITagProps = {
        onPress: () => { },
        text: ''
    }

    public render(): JSX.Element {
        return (
            <SafeTouch
                onPress={this.props.onPress}
                style={Styles.container}
            >
                <BaseText
                    text={this.props.text}
                    style={Styles.text}
                />
                <Icon
                    name={'close'}
                    size={16}
                />
            </SafeTouch >
        )
    }
}
