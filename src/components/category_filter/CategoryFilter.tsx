import * as React from 'react'
import * as Animatable from 'react-native-animatable'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../../Constants'
import { SafeTouch } from '../safe_touch/SafeTouch'
import { Styles } from './CategoryFilterStyles'
import { Category } from '../../models/Category'

interface IProps {
    categories: Map<number, Category>
}
interface IState {
    isOpen: boolean
}

export class CategoryFilter<IPassedProps extends IProps> extends React.Component<IPassedProps, IState> {
    public tabAnimatable = null

    public render(): JSX.Element {
        return (
            <Animatable.View
                // animation={'fadeInRight'}
                style={Styles.root}
                useNativeDriver={true}
                ref={(ref) => (this.tabAnimatable = ref)}
            >
                <SafeTouch style={Styles.rootSafeTouch} onPress={() => this.tabAnimatable.bounce(800)}>
                    <MaterialIcon name='tune' size={36} color={Colors.creamLight} />
                </SafeTouch>
            </Animatable.View>
        )
    }
}
