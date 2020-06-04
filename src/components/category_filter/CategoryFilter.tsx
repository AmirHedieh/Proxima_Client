import * as React from 'react'
import * as Animatable from 'react-native-animatable'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../../Constants'
import { Category } from '../../models/Category'
import { SafeTouch } from '../safe_touch/SafeTouch'
import { Styles } from './CategoryFilterStyles'

interface IProps {
    categories: Map<number, Category>
}
interface IState {
    isOpen: boolean
    selectedCategory: number
}

export class CategoryFilter<IPassedProps extends IProps> extends React.Component<IPassedProps, IState> {
    public state: IState = {
        isOpen: false,
        selectedCategory: null
    }
    public tabAnimatable = null

    public render(): JSX.Element {
        return (
            <Animatable.View
                transition={['height', 'width']}
                style={this.getRootStyle()}
                ref={(ref) => (this.tabAnimatable = ref)}
            >
                <SafeTouch style={Styles.rootSafeTouch} onPress={this.onIconPress}>
                    <MaterialIcon name='tune' size={36} color={Colors.creamLight} />
                </SafeTouch>
            </Animatable.View>
        )
    }

    private getRootStyle(): any {
        if (this.state.isOpen === false) {
            return Styles.root
        }
        if (this.state.selectedCategory) {
            return [Styles.root, Styles.rootExpandedWithSelection]
        } else {
            return [Styles.root, Styles.rootExpandedNoSelection]
        }
    }

    private onIconPress = () => {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen
        }))
    }
}
