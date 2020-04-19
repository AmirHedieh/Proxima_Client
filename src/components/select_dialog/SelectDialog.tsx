import * as React from 'react'
import { FlatList, Modal, View } from 'react-native'
import Icon from 'react-native-vector-icons/Fontisto'
import { Localization } from '../../text_process/Localization'
import { CommonValidator } from '../../utils/Validator'
import { BaseText } from '../base_text/BaseText'
import { RTLAwareView } from '../rtl_aware/RTLAwareView'
import { SafeTouch } from '../safe_touch/SafeTouch'
import { Styles } from './SelectDialogStyles'

interface ISelectDialogState {
    isVisible: boolean,
    selectedItems: Map<string, string>
}

export interface ISelectDialogItem {
    label: string,
    key: string
}

export class SelectDialog extends React.Component {
    public state: ISelectDialogState = {
        isVisible: false,
        selectedItems: new Map<string, string>()
    }
    private items: ISelectDialogItem[] = []
    private title: string = ''
    private description: string = ''
    private isMultiSelect: boolean = false
    private hasSelectAll: boolean = false
    private selectAllItem: ISelectDialogItem = {
        key: 'selectAll',
        label: Localization.translate('selectAllDialogSearchScene')
    }
    public show = (event: {
        items: ISelectDialogItem[],
        title: string,
        description?: string,
        isMultiSelect: boolean,
        hasSelectAll?: boolean,
        onItemsSelected: (selectedItems: Map<string, string>) => void
    }) => {
        this.items = CommonValidator.isArray(event.items) ? event.items : []
        this.title = CommonValidator.isNullOrEmpty(event.title) ? '' : event.title
        this.description = CommonValidator.isNullOrEmpty(event.description) ? '' : event.description
        this.isMultiSelect = event.isMultiSelect
        this.hasSelectAll = event.hasSelectAll
        this.onItemsSelected = event.onItemsSelected || this.onItemsSelected

        if (this.hasSelectAll) {
            this.items.unshift(this.selectAllItem)
        }

        this.setState(
            {
                isVisible: true,
                selectedItems: new Map<string, string>()
            }
        )
    }

    public render(): JSX.Element {
        return (
            <Modal
                animationType={'slide'}
                visible={this.state.isVisible}
                transparent={false}
                onRequestClose={this.onRequestClose}
            >
                <View>
                    <SafeTouch
                        onPress={this.onRequestClose}
                    >
                        <Icon
                            name={'angle-down'}
                            style={Styles.angleDown}
                        />
                    </SafeTouch>
                </View>
                <View style={Styles.header}>
                    <BaseText
                        text={this.title}
                        style={Styles.title}
                    />
                    <BaseText
                        text={this.description}
                        style={Styles.description}
                    />
                </View>

                <FlatList
                    data={this.items}
                    renderItem={this.renderItem}
                    keyExtractor={this.keyExtractor}
                    extraData={this.state}
                />
            </Modal>
        )
    }

    private onRequestClose = () => {
        if (this.hasSelectAll) {
            this.items.shift()
            if (this.state.selectedItems.has(this.selectAllItem.key)) {
                this.state.selectedItems.delete(this.selectAllItem.key)
            }
        }
        if (this.isMultiSelect) {
            this.onItemsSelected(this.state.selectedItems)
        }
        this.setState({ isVisible: false })
    }
    private hide = () => {
        if (this.hasSelectAll) {
            this.items.shift()
            if (this.state.selectedItems.has(this.selectAllItem.key)) {
                this.state.selectedItems.delete(this.selectAllItem.key)
            }
        }
        this.onItemsSelected(this.state.selectedItems)
        this.setState({ isVisible: false })
    }

    private onItemsSelected: (selectedItems: Map<string, string>) => void = () => {
    }

    private renderItem = ({ item }) => {
        let isSelected: boolean = false
        if (this.state.selectedItems.has(item.key)) {
            isSelected = true
        }

        const onPress = () => this.itemOnPress(item)
        return (
            <SafeTouch
                onPress={onPress}
            >
                <RTLAwareView
                    style={Styles.itemContainer}
                >
                    <BaseText
                        text={item.label}
                        style={Styles.itemText}
                    />
                    {this.checkBoxIconRender(isSelected)}
                </RTLAwareView>
            </SafeTouch>
        )
    }

    private checkBoxIconRender(selected: boolean) {
        if (this.isMultiSelect) {
            if (selected) {
                return (
                    <Icon
                        name={'checkbox-active'}
                        {...Styles.checkboxIcon}
                    />
                )
            } else {
                return (
                    <Icon
                        name={'checkbox-passive'}
                        {...Styles.checkboxIcon}
                    />
                )
            }
        } else {
            return null
        }
    }

    private itemOnPress(itemPressed: ISelectDialogItem) {
        let selectedItems = this.state.selectedItems
        let isSelected: boolean = false
        if (this.state.selectedItems.has(itemPressed.key)) {
            isSelected = true
        }

        if (this.hasSelectAll && itemPressed.key === this.selectAllItem.key) {
            if (isSelected) {
                selectedItems = new Map<string, string>()
            } else {
                selectedItems = new Map<string, string>()
                selectedItems.set(this.selectAllItem.key, this.selectAllItem.label)
                for (const item of this.items) {
                    selectedItems.set(item.key, item.label)
                }
            }
            this.setState({
                selectedItems
            })
            return
        }

        if (this.isMultiSelect) {
            if (isSelected) {
                selectedItems.delete(itemPressed.key)
                if (selectedItems.has(this.selectAllItem.key)) {
                    selectedItems.delete(this.selectAllItem.key)
                }
            } else {
                selectedItems.set(itemPressed.key, itemPressed.label)
            }
            this.setState({
                selectedItems
            })
        } else {
            selectedItems = new Map<string, string>()
            selectedItems.set(itemPressed.key, itemPressed.label)
            this.setState({
                selectedItems
            })
            this.hide()
        }
    }

    private keyExtractor = (item) => {
        return item.key
    }
}
