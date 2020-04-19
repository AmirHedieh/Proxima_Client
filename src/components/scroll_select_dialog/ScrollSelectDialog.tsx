import * as React from 'react'
import { Platform, ScrollView, View } from 'react-native'
import { Dimension, GlobalStyles } from '../../GlobalStyles'
import { Localization } from '../../text_process/Localization'
import { CommonValidator } from '../../utils/Validator'
import { BaseDialog, IBaseDialogProps, IBaseDialogState } from '../base_dialog/BaseDialog'
import { BaseText } from '../base_text/BaseText'
import { NormalButton } from '../normal_button/NormalButton'
import { Styles } from './ScrollSelectDialogStyles'

interface IScrollSelectDialogState extends IBaseDialogState {
    isVisible: boolean,
    selectedIndex: number[] // array of SelectDialogItem index for each column selected value
}

export interface ISelectDialogItem {
    label: string,
    key: string
}

const ITEM_HEIGHT = 60 * Dimension.scaleY

export class ScrollSelectDialog extends BaseDialog<IBaseDialogProps, IScrollSelectDialogState> {
    public state: IScrollSelectDialogState = {
        isVisible: false,
        isCancellable: true,
        selectedIndex: []
    }
    private selectedItems: Array<Map<string, string>> = []
    private items: ISelectDialogItem[][] = []
    private momentumStarted: boolean
    private timer: any[] = []
    private scrollRef: any[] = [] // array of scroll refs for each column
    private title: string = ''
    private unit: string = ''
    private isScrollTo: boolean
    private dragStarted: boolean = false

    public show = (event: {
        items: ISelectDialogItem[][], // it is a 2d array each dimension for each Column values
        title: string,
        unit?: string,
        onItemScroll?: (
            selectedIndex: number[], items: ISelectDialogItem[][], changedColumn: number, selectedValue: number
        ) => void
        onOkButtonPressedCallback?: (selectedItems: Array<Map<string, string>>) => void
    }) => {
        this.items = CommonValidator.isArray(event.items) ? event.items : []
        this.title = CommonValidator.isNullOrEmpty(event.title) ? '' : event.title
        this.unit = CommonValidator.isNullOrEmpty(event.unit) ? '' : event.unit
        this.onOkButtonPressedCallback = event.onOkButtonPressedCallback || this.onOkButtonPressedCallback
        this.onItemScroll = event.onItemScroll || this.onItemScroll

        const selectedIndex = []
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.items.length; i++) {
            this.selectedItems[i] = new Map<string, string>()
            this.selectedItems[i].set(this.items[i][0].key, this.items[i][0].label)
            selectedIndex[i] = 0
        }

        this.setState(
            {
                selectedIndex,
                isVisible: true
            }
        )
    }
    public hide() {
        this.superHide()
    }

    protected renderInside(): JSX.Element {
        const unit = this.unit
            ? <BaseText text={this.unit} style={Styles.unit} />
            : null
        const uniSpacer = this.unit
            ? <View style={GlobalStyles.spacer} />
            : null

        return (
            <View style={Styles.mainContainerStyle}>
                <View style={Styles.header}>
                    <BaseText
                        text={this.title}
                        style={Styles.title}
                    />
                </View>
                <View style={Styles.selectView}>
                    {unit}
                    {this.scrollsRender()}
                    {uniSpacer}
                </View>
                <View style={Styles.buttonsSpacer} />
                <View style={Styles.buttonContainerStyle}>
                    <NormalButton
                        onPress={this.onPressEvent}
                        text={Localization.translate('confirm')}
                        isFilled={false}
                    />
                </View>
            </View>
        )
    }

    protected onRequestClose = () => {
        this.setState({ isVisible: false })
    }

    private onPressEvent = (): void => {
        this.onOkButtonPressedCallback(this.selectedItems)
        this.hide()
    }

    private scrollsRender = (): JSX.Element[] => {
        const flatListWrapperStyle = [{ height: ITEM_HEIGHT * 3 }, Styles.scrollViewWrapper]
        const renders = []
        // this is used to divide ReactNative Touchable and ScrollView Touching
        const onStartShouldSetResponder = () => true
        for (let i = 0; i < this.items.length; i++) {
            const onMomentumScrollEnd = (e) => this.onMomentumScrollEnd(e, i)
            const onScrollEndDrag = (e) => this.onScrollEndDrag(e, i)
            const onMomentumScrollBegin = () => this.onMomentumScrollBegin(i)
            const onScrollBeginDrag = () => this.onScrollBeginDrag(i)

            renders.push(
                <View
                    style={flatListWrapperStyle}
                    onStartShouldSetResponder={onStartShouldSetResponder}
                >
                    <ScrollView
                        ref={(ref) => this.scrollRef[i] = ref}
                        contentContainerStyle={Styles.scrollView}
                        showsVerticalScrollIndicator={false}
                        onMomentumScrollBegin={onMomentumScrollBegin}
                        onMomentumScrollEnd={onMomentumScrollEnd}
                        onScrollBeginDrag={onScrollBeginDrag}
                        onScrollEndDrag={onScrollEndDrag}
                    >
                        {this.renderItems(this.items[i], i)}
                    </ScrollView>
                </ View>
            )
        }
        return renders
    }

    private onMomentumScrollBegin = (refNumber: number) => {
        this.momentumStarted = true
        if (this.timer[refNumber]) {
            clearTimeout(this.timer[refNumber])
        }
    }

    private onMomentumScrollEnd = (e, refNumber: number) => {
        this.momentumStarted = false
        if (!this.isScrollTo && !this.momentumStarted && !this.dragStarted) {
            this.scrollFix(e, refNumber)
        }
    }

    private scrollFix = (e, refNumber: number) => {
        let verticalY = 0
        const h = ITEM_HEIGHT
        if (e.nativeEvent.contentOffset) {
            verticalY = e.nativeEvent.contentOffset.y
        }
        const selectedIndex = Math.round(verticalY / h)
        const verticalElem = selectedIndex * h
        if (verticalElem !== verticalY) {
            // using scrollTo in ios, onMomentumScrollEnd will be invoked
            if (Platform.OS === 'ios') {
                this.isScrollTo = true
            }
            if (this.scrollRef) {
                this.scrollRef[refNumber].scrollTo({ y: verticalElem })
            }
        }
        const selectedIndexes: number[] = this.state.selectedIndex
        if (selectedIndexes[refNumber] === selectedIndex) {
            return
        }

        this.selectedItems[refNumber].clear() // cant have multi select
        this.selectedItems[refNumber].set(
            this.items[refNumber][selectedIndex].key, this.items[refNumber][selectedIndex].label
        )

        selectedIndexes[refNumber] = selectedIndex
        this.onItemScroll(this.state.selectedIndex, this.items, refNumber, selectedIndex)
        this.setState({
            selectedIndex: selectedIndexes
        })
        this.forceUpdate()
    }

    private onScrollBeginDrag = (refNumber: number) => {
        this.dragStarted = true
        if (Platform.OS === 'ios') {
            this.isScrollTo = false
        }
        if (this.timer) {
            clearTimeout(this.timer[refNumber])
        }
    }

    private onScrollEndDrag = (e, refNumber: number) => {
        this.dragStarted = false
        // if not used, event will be garbages
        const element = {
            nativeEvent: {
                contentOffset: {
                    y: e.nativeEvent.contentOffset.y
                }
            }
        }
        if (this.timer) {
            clearTimeout(this.timer[refNumber])
        }
        this.timer[refNumber] = setTimeout(
            () => {
                if (!this.momentumStarted && !this.dragStarted) {
                    this.scrollFix(element, refNumber)
                    this.forceUpdate()
                }
            },
            10
        )
    }

    private onOkButtonPressedCallback: (selectedItems: Array<Map<string, string>>) => void = () => {
    }

    private onItemScroll: (
        selectedIndex: number[], items: ISelectDialogItem[][], changedColumn: number, selectedValue: number
    ) => void = () => {
    }

    private renderItems = (items: ISelectDialogItem[], refNumber: number) => {
        const itemStyle = [{ height: ITEM_HEIGHT }, Styles.itemsView]
        const renders = [(<View style={itemStyle} />)]
        for (let i = 0; i < items.length; i++) {
            let itemTextStyle = Styles.itemText
            if (i !== this.state.selectedIndex[refNumber]) {
                itemTextStyle = Styles.itemTextUnSelected
            }
            renders.push(
                <View style={itemStyle}>
                    <BaseText
                        text={items[i].label}
                        style={itemTextStyle}
                    />
                </View>
            )
        }
        renders.push(<View style={itemStyle} />)
        return renders
    }
}
