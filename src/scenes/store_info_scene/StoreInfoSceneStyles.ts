import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes } from '../../GlobalStyles'

const expandingTabExpandedHeight: number = 560 * Dimension.scaleY
const expandingTabCollapsedHeight: number = 72 * Dimension.scaleY

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
    centerScrollViewContainer: {
        alignItems: 'center',
        paddingHorizontal: 28 * Dimension.scaleX,
        paddingTop: 16 * Dimension.scaleY,
        // expanding tab height is added to bottom padding to fix ScrollView bug, which is center container content
        // would go under expanding tab because its absolute positioned
        paddingBottom: expandingTabCollapsedHeight + 33 * Dimension.scaleY
    },
    name: {
        fontSize: FontSizes.h2,
        fontFamily: Fonts.persian.vazirMedium
    },
    rowCenterView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16 * Dimension.scaleX,
        paddingVertical: 8 * Dimension.scaleY
    },
    image: {
        width: 304 * Dimension.scaleX,
        height: 228 * Dimension.scaleY,
        borderRadius: 12 * Dimension.scaleX
    },
    phoneNumber: {
        fontFamily: Fonts.persian.vazirBold,
        fontSize: FontSizes.h2
    },
    info: {
        width: '100%'
    },
    contactText: {
        fontFamily: Fonts.persian.vazirMedium,
        fontSize: FontSizes.h2
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
        height: 40 * Dimension.scaleY
    },
    productsTabSafeTouchCollapsed: {
        flex: 1
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
    searchingContainer: {
        flex: 1
    },
    animationAndTextContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: Dimension.deviceHeight - 2 * expandingTabCollapsedHeight - Dimension.statusBarHeight
    },
    animationContainer: {
        width: 240,
        height: 240,
        borderRadius: 240,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#000'
    },
    animation: {
        width: 180 * Dimension.scaleX,
        height: 180 * Dimension.scaleY
    },
    searchingTitle: {
        fontSize: FontSizes.h2,
        fontFamily: Fonts.persian.vazirBold,
        color: Colors.black
    },
    searchingBottomTab: {
        flexDirection: 'row',
        width: '100%',
        height: expandingTabCollapsedHeight,
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
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
