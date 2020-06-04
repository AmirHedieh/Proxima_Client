import * as React from 'react'
import * as Animatable from 'react-native-animatable'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../../Constants'
import { Category } from '../../models/Category'
import { SafeTouch } from '../safe_touch/SafeTouch'
import { Styles } from './CategoryFilterStyles'
import { FlatList, View } from 'react-native'
import { BaseText } from '../base_text/BaseText'
import { Dimension, GlobalStyles } from '../../GlobalStyles'
import { Localization } from '../../text_process/Localization'

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
        if (this.state.isOpen === false && this.state.selectedCategory == null) {
            return (
                <SafeTouch style={Styles.rootSafeTouch} onPress={this.onIconPress}>
                    <MaterialIcon name='tune' size={36 * Dimension.scaleX} color={Colors.creamLight} />
                </SafeTouch>
            )
        }
        // render close but with selected items
        if (this.state.isOpen === false && this.state.selectedCategory) {
            return (
                <View style={Styles.expandedContainer}>
                    <SafeTouch style={{ padding: 12 * Dimension.scaleX }} onPress={this.onIconPress}>
                        <MaterialIcon name='tune' size={36 * Dimension.scaleX} color={Colors.creamLight} />
                    </SafeTouch>
                    <View style={Styles.selectedCategoriesFlatListContainer}>
                        {this.renderSelectedCategoriesFlatList(this.findCategoryParents(this.state.selectedCategory))}
                    </View>
                </View>
            )
        }
        // render no selection state
        if (this.state.selectedCategory == null) {
            return (
                <View style={Styles.expandedContainer}>
                    <SafeTouch onPress={this.onIconPress}>{this.collapseIcon}</SafeTouch>
                    {this.renderCategoriesFlatList([...this.props.categories.values()])}
                </View>
            )
        } else if (this.state.selectedCategory) {
            // render selected state
            const subCategories: Category[] = []
            let subCategoriesContent: JSX.Element = null
            for (const element of this.props.categories.get(this.state.selectedCategory).children) {
                subCategories.push(this.props.categories.get(element))
            }
            if (subCategories.length === 0) {
                // no more category to show
                subCategoriesContent = (
                    <View style={Styles.noMoreCategoryContainer}>
                        <BaseText
                            style={Styles.noMoreCategoryText}
                            text={Localization.translate('noMoreCategoriesCategoryFilter')}
                        />
                    </View>
                )
            } else {
                {
                    subCategoriesContent = this.renderCategoriesFlatList(subCategories)
                }
            }
            return (
                <View style={Styles.expandedContainer}>
                    <SafeTouch onPress={this.onIconPress}>{this.collapseIcon}</SafeTouch>
                    <View style={{ flex: 1 }}>
                        {subCategoriesContent}
                        <View style={Styles.selectedCategoriesFlatListContainer}>
                            {this.renderSelectedCategoriesFlatList(
                                this.findCategoryParents(this.state.selectedCategory)
                            )}
                        </View>
                    </View>
                </View>
            )
        }
    }

    private categoryKeyExtractor = (item: Category) => String(item.id)

    private renderCategoriesFlatList(data: Category[]): JSX.Element {
        return (
            <FlatList
                inverted={true}
                keyExtractor={this.categoryKeyExtractor}
                data={data} // reverse to make first index appear right
                horizontal={true}
                renderItem={this.renderCategoriesFlatListItem}
                ItemSeparatorComponent={this.renderCategoriesFlatListItemsSeparator}
            />
        )
    }

    private renderCategoriesFlatListItemsSeparator = () => <View style={{ width: 8 * Dimension.scaleX }} />

    private renderCategoriesFlatListItem = (event: { item: Category }): JSX.Element => {
        const onPress = () =>
            this.setState({
                selectedCategory: event.item.id
            })
        return (
            <SafeTouch style={Styles.categoryItemContainer} onPress={onPress}>
                <BaseText style={Styles.categoryItemText} text={event.item.name} />
            </SafeTouch>
        )
    }

    private renderSelectedCategoriesFlatList(data: Category[]): JSX.Element {
        return (
            <FlatList
                contentContainerStyle={Styles.selectedCategoriesFlatListContentContainer}
                ListFooterComponent={this.renderClearSelection}
                keyExtractor={this.categoryKeyExtractor}
                data={data}
                horizontal={true}
                renderItem={this.renderSelectedCategoriesFlatListItem}
            />
        )
    }

    private renderSelectedCategoriesFlatListItem = (event: { index: number; item: Category }): JSX.Element => {
        const onPress = () =>
            this.setState({
                isOpen: false
                // selectedCategory: event.item.id
            })
        return (
            <View style={Styles.selectedItemWrapper}>
                <SafeTouch style={Styles.selectedCategoryItemContainer} onPress={onPress}>
                    <BaseText style={Styles.selectedCategoryItemText} text={event.item.name} />
                </SafeTouch>
            </View>
        )
    }

    private renderClearSelection = (): JSX.Element => {
        return (
            <View style={Styles.selectedItemWrapper}>
                <SafeTouch style={Styles.selectedCategoryItemContainer} onPress={this.onClearIconPress}>
                    <MaterialIcon name='clear' size={26} color={Colors.primaryDark} />
                </SafeTouch>
            </View>
        )
    }

    private findCategoryParents(id: number): Category[] {
        if (id == null) {
            return []
        }
        const selectedCategories: Category[] = [this.props.categories.get(id)]
        let currentCategory: Category = this.props.categories.get(id)
        while (true) {
            const parentId = currentCategory.parent
            if (!parentId) {
                break
            }
            currentCategory = this.props.categories.get(parentId)
            selectedCategories.push(currentCategory)
        }
        return selectedCategories
    }

    private getRootStyle(): any {
        if (this.state.isOpen === false && this.state.selectedCategory == null) {
            return Styles.root
        }
        if (this.state.isOpen === false && this.state.selectedCategory) {
            return [Styles.root, Styles.rootCloseWithSelection]
        }
        if (this.state.selectedCategory) {
            return [Styles.root, Styles.rootOpenWithSelection]
        } else {
            return [Styles.root, Styles.rootOpenNoSelection]
        }
    }

    private onIconPress = () => {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen
        }))
    }

    private onClearIconPress = () => {
        this.setState({
            isOpen: false,
            selectedCategory: null
        })
    }
}
