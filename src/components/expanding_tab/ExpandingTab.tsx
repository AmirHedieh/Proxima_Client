import * as React from 'react'
import * as Animatable from 'react-native-animatable'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { BaseText } from '../base_text/BaseText'
import { SafeTouch } from '../safe_touch/SafeTouch'
import { Styles } from './ExpandingTabStyles'
interface IState {
    isExpanded: boolean
}

interface IProps {
    onExpand?: () => void
    onCollapse?: () => void
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
                <SafeTouch
                    style={[
                        Styles.safeTouch,
                        this.state.isExpanded ? Styles.safeTouchExpanded : Styles.safeTouchCollapsed
                    ]}
                    onPress={this.switchExpansionState}
                >
                    {this.state.isExpanded ? (
                        <MaterialIcon size={52} name='expand-more' color='#000' />
                    ) : (
                        <BaseText style={Styles.collapsedTitle} text={this.props.collapsedTitle} />
                    )}
                </SafeTouch>
                {this.state.isExpanded ? this.props.expandedContent : null}
            </Animatable.View>
        )
    }
    private switchExpansionState = () => {
        this.setState({
            isExpanded: !this.state.isExpanded
        })
    }
}
