import * as React from 'react'
import { View } from 'react-native'
import * as Animatable from 'react-native-animatable'
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
        return (
            <Animatable.View
                transition={'height'}
                style={[Styles.container, this.state.isExpanded ? Styles.expandedContainer : Styles.collapsedContainer]}
            >
                <SafeTouch style={{ flex: 1, backgroundColor: '#0ff' }} onPress={this.switchExpansionState}>
                    <BaseText text='touch me' />
                </SafeTouch>
            </Animatable.View>
        )
    }
    private switchExpansionState = () => {
        this.setState({
            isExpanded: !this.state.isExpanded
        })
    }
}
