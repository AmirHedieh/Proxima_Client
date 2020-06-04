import * as React from 'react'
import * as Animatable from 'react-native-animatable'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../../Constants'
import { Category } from '../../models/Category'
import { SafeTouch } from '../safe_touch/SafeTouch'
import { Styles } from './CategoryFilterStyles'
import { FlatList, View } from 'react-native'
import { BaseText } from '../base_text/BaseText'
import { Dimension } from '../../GlobalStyles'

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
    private collapseIcon: JSX.Element = (
        <MaterialIcon name='chevron-right' size={40 * Dimension.scaleX} color={Colors.creamLight} />
    )

    public render(): JSX.Element {
        return (
            <Animatable.View
                transition={['height', 'width']}
                style={this.getRootStyle()}
                ref={(ref) => (this.tabAnimatable = ref)}
            >
                {this.renderContainer()}
            </Animatable.View>
        )
    }

    private renderContainer(): JSX.Element {
        // render an icon to open tab
        if (this.state.isOpen === false) {
            return (
                <SafeTouch style={Styles.rootSafeTouch} onPress={this.onIconPress}>
                    <MaterialIcon name='tune' size={36 * Dimension.scaleX} color={Colors.creamLight} />
                </SafeTouch>
            )
        }
        // render no selection state
        if (this.state.selectedCategory == null) {
            return (
                <View
                    style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingLeft: 16 * Dimension.scaleX }}
                >
                    <SafeTouch onPress={this.onIconPress}>{this.collapseIcon}</SafeTouch>
                    {this.renderCategoriesFlatList()}
                </View>
            )
        }
    }

    private categoryKeyExtractor = (item: Category) => String(item.id)

    private renderCategoriesFlatList(): JSX.Element {
        return (
            <FlatList
                keyExtractor={this.categoryKeyExtractor}
                ItemSeparatorComponent={this.renderCategoriesFlatListItemsSeparator}
                data={[...this.props.categories.values()]}
                horizontal={true}
                renderItem={this.renderCategoriesFlatListItem}
            />
        )
    }

    private renderCategoriesFlatListItemsSeparator = () => <View style={{ width: 8 * Dimension.scaleX }} />

    private renderCategoriesFlatListItem = (event: { item: Category }): JSX.Element => {
        return (
            <SafeTouch style={Styles.categoryItemContainer}>
                <BaseText style={Styles.categoryItemText} text={event.item.name} />
            </SafeTouch>
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
