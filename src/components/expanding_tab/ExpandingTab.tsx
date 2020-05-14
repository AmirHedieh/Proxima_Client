import * as React from 'react'
import { View } from 'react-native'
import { Dimension } from '../../GlobalStyles'
import { BaseText } from '../base_text/BaseText'
import { SafeTouch } from '../safe_touch/SafeTouch'
import { Styles } from './ExpandingTabStyles'

interface IState {
    isExpanded: boolean
}

interface IProps {
    collapsedTitle: string
    expandedContent: JSX.Element
}
export class ExpandingTab extends React.Component<IProps, IState> {
    public state: IState = {
        isExpanded: false
    }

    public render(): JSX.Element {
        if (this.state.isExpanded === false) {
            return (
                <SafeTouch onPress={this.expand} style={Styles.collapsedContainer}>
                    <BaseText text={this.props.collapsedTitle} />
                </SafeTouch>
            )
        }
        return (
            <View style={Styles.expandedContainer}>
                <SafeTouch onPress={this.collapse}>
                    <BaseText text={'collapse'} />
                </SafeTouch>
            </View>
        )
    }
    private expand = () => {
        this.setState({
            isExpanded: true
        })
    }
    private collapse = () => {
        this.setState({
            isExpanded: false
        })
    }
}
