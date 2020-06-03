import * as React from 'react'
import { View } from 'react-native'
import { GlobalState } from '../../models/GlobalState'
import { StyleType } from '../../Types'
import { stores } from '../../mobx/RootStore'

interface IRtlAwareProps {
    autoJustifyContent?: boolean
    reverseJustifyContent?: boolean
    autoReverseChildren?: boolean
    style?: StyleType
}

export class RTLAwareView extends React.PureComponent<IRtlAwareProps> {
    public static defaultProps: IRtlAwareProps = {
        autoJustifyContent: true,
        reverseJustifyContent: false,
        autoReverseChildren: true,
        style: null
    }
    public render(): JSX.Element {
        let childrenArray = React.Children.toArray(this.props.children)
        let startDirection = this.props.reverseJustifyContent ? 'flex-end' : 'flex-start' // (ltr) default: flex-start
        if (stores.UIState.getLanguage() === 'fa') {
            if (this.props.autoJustifyContent) {
                startDirection = this.props.reverseJustifyContent ? 'flex-start' : 'flex-end'
            }
            if (this.props.autoReverseChildren) {
                childrenArray = childrenArray.reverse()
            }
        }
        const style = {
            flexDirection: 'row',
            justifyContent: startDirection
        }
        return <View style={[style, this.props.style]}>{childrenArray}</View>
    }
}
