import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes } from '../../GlobalStyles'

export const expandingTabExpandedHeight: number = 560 * Dimension.scaleY
export const expandingTabCollapsedHeight: number = 72 * Dimension.scaleY

const expandingTabBigRadius = 48 * Dimension.scaleX
const expandingTabSmallRadius = 12 * Dimension.scaleX

export const Styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.creamMedium
    },
    appInfoTabContainer: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: Colors.creamLight,
        borderBottomRightRadius: expandingTabBigRadius,
        borderBottomLeftRadius: expandingTabSmallRadius
    },
    appInfoTabExpandedContainer: {
        height: expandingTabExpandedHeight
    },
    appInfoTabCollapsedContainer: {
        height: expandingTabCollapsedHeight,
        justifyContent: 'center'
    },
    appInfoTabSafeTouch: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    appInfoTabSafeTouchExpanded: {
        height: 40 * Dimension.scaleY,
        alignSelf: 'flex-end'
    },
    appInfoTabSafeTouchCollapsed: {
        flex: 1
    },
    /** height: 8 */
    smallSpacer: {
        height: 8 * Dimension.scaleY
    },
    /** height: 16 */
    mediumSpacer: {
        height: 16 * Dimension.scaleY
    },
    /** height: 24 */
    largeSpacer: {
        height: 24 * Dimension.scaleY
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
        alignItems: 'center'
    },
    productsTabExpandedContainer: {
        height: expandingTabExpandedHeight
    },
    productsTabCollapsedContainer: {
        height: expandingTabCollapsedHeight,
        justifyContent: 'center'
    },
    productsTabSafeTouch: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
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
    productsTabBackgroundContainer: {
        flexDirection: 'row',
        height: Dimension.deviceHeight - expandingTabExpandedHeight - Dimension.statusBarHeight,
        alignItems: 'center',
        paddingRight: 28 * Dimension.scaleX,
        paddingLeft: 48 * Dimension.scaleX
    },
    productsTabBackgroundTitle: {
        color: Colors.creamLight,
        fontFamily: Fonts.persian.vazirMedium
    },
    productsTabFlatListContainer: {
        paddingTop: 4 * Dimension.scaleY,
        paddingBottom: 16 * Dimension.scaleY
    },
    animation: {
        width: 180 * Dimension.scaleX,
        height: 180 * Dimension.scaleY
    },
    searchingBottomTab: {
        flexDirection: 'row',
        width: '100%',
        height: expandingTabCollapsedHeight,
        paddingRight: 28 * Dimension.scaleX,
        paddingLeft: 25 * Dimension.scaleX,
        alignItems: 'center',
        backgroundColor: Colors.creamLight,
        borderTopLeftRadius: expandingTabBigRadius,
        borderTopRightRadius: expandingTabSmallRadius
    },
    searchingBottomTabTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: FontSizes.h3,
        fontFamily: Fonts.persian.vazirBold
    }
})
