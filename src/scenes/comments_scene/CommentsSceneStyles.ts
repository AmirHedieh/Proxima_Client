import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes, GlobalStyles } from '../../GlobalStyles'

const editTextsWidth: number = 280 * Dimension.scaleX
export const expandingTabExpandedHeight: number = 320 * Dimension.scaleY
export const expandingTabCollapsedHeight: number = 72 * Dimension.scaleY

const expandingTabBigRadius = 48 * Dimension.scaleX
const expandingTabSmallRadius = 12 * Dimension.scaleX

export const Styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.creamMedium,
        alignItems: 'center'
    },
    flatList: {
        // flex: 1
        paddingBottom: 32 * Dimension.scaleY
    },
    flatListContainer: {
        flex: 1,
        paddingTop: Dimension.collapsedTabHeight,
        paddingBottom: Dimension.collapsedTabHeight,
        // height: Dimension.deviceHeight -  2 * Dimension.collapsedTabHeight,
        paddingHorizontal: 16 * Dimension.scaleX,
    },
    noCommentText: {
        marginTop: 32 * Dimension.scaleY,
        alignSelf: 'center',
        fontSize: FontSizes.h1,
        color: Colors.creamDark
    },
    commentorEditText: {
        width: editTextsWidth,
    },
    commentorEditTextInnerContainer: {
        borderRadius: 8 * Dimension.scaleX,
    },
    textEditText: {
        width: editTextsWidth,
    },
    textEditTextInnerContainer: {
        borderRadius: 8 * Dimension.scaleX,
    },
    textEditText2: {
        height: 128 * Dimension.scaleY,
        // textAlign: 'right',
         textAlignVertical: 'top'
    },
    BottomContainer: {
        backgroundColor: Colors.creamLight,
        paddingVertical: 8 * Dimension.scaleY
    },
    editTextsContainer: {
        alignItems: 'center',
        paddingHorizontal: 16 * Dimension.scaleX
    },
    submitCommentButton: {
        padding: 8 * Dimension.scaleX,
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainerDivider: {
        width: 1 * Dimension.scaleX,
        height: '100%',
        paddingVertical: 16 * Dimension.scaleY,
        backgroundColor: Colors.creamMedium2
    },
    productsTabContainer: {
        width: '100%',
        height: expandingTabExpandedHeight,
        translateY: expandingTabExpandedHeight - expandingTabCollapsedHeight,
        position: 'absolute',
        bottom: 0,
        backgroundColor: Colors.creamLight,
        borderTopLeftRadius: expandingTabBigRadius,
        borderTopRightRadius: expandingTabSmallRadius,
        alignItems: 'center',
        borderWidth: 2 * Dimension.scaleX,
        borderColor: Colors.creamDark
    },
    productsTabSafeTouch: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productsTabSafeTouchExpanded: {
        height: 32 * Dimension.scaleY
    },
    productsTabSafeTouchCollapsed: {
        height: expandingTabCollapsedHeight
    },
    expandingTabCollapsedTitle: {
        fontFamily: Fonts.persian.vazirBold
    },
})
