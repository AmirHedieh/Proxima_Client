import * as React from 'react'
import { FlatList, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../../Constants'
import { Dimension } from '../../GlobalStyles'
import { Category } from '../../models/Category'
import { Localization } from '../../text_process/Localization'
import { BaseText } from '../base_text/BaseText'
import { SafeTouch } from '../safe_touch/SafeTouch'
import { Styles } from './CategoryFilterStyles'

interface IProps {
    categories: Map<number, Category>
    fetchData: (params: { category: number }) => void
}
interface IState {
    isVisible: boolean
    isOpen: boolean
    selectedCategory: number
}

export class CategoryFilter<IPassedProps extends IProps> extends React.Component<IPassedProps, IState> {
    public state: IState = {
        isVisible: false,
        isOpen: false,
        selectedCategory: null
    }
    public tabAnimatable = null
    private collapseIcon: JSX.Element = (
        <MaterialIcon name='chevron-right' size={40 * Dimension.scaleX} color={Colors.creamLight} />
    )

    public show(): void {
        this.setState({
            isVisible: true
        })
    }

    public async hide(): Promise<void> {
        this.setState({
            isVisible: false
        })
    }

    public render(): JSX.Element {
        if (this.state.isVisible === false) {
            return null
        }
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
                    <View style={[Styles.expandedContainer, { paddingLeft: 0, paddingRight: 8 * Dimension.scaleX }]}>
                        {this.renderCategoriesFlatList(
                            [...this.props.categories.values()].filter((item) => item.parent == null)
                        )}
                    </View>
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
                    subCategoriesContent = (
                        <View
                            style={[Styles.expandedContainer, { paddingLeft: 0, paddingRight: 8 * Dimension.scaleX }]}
                        >
                            {this.renderCategoriesFlatList(subCategories)}
                        </View>
                    )
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
        const onPress = () => {
            this.setState({
                selectedCategory: event.item.id
            })
            this.props.fetchData({ category: event.item.id })
        }
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

    private renderSelectedCategoriesFlatListItem = (event: { item: Category }): JSX.Element => {
        const onPress = () => {
            this.setState({
                selectedCategory: event.item.id
            })
            this.props.fetchData({ category: event.item.id })
        }
        let wrapperStyle: any = Styles.selectedItemWrapper
        if (event.item.id === this.state.selectedCategory) {
            wrapperStyle = [wrapperStyle, { backgroundColor: Colors.primaryMedium }]
        }
        return (
            <View style={wrapperStyle}>
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
        this.props.fetchData({ category: null })
    }
}
