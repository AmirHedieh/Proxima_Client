import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes } from '../../GlobalStyles'

const expandingTabExpandedHeight: number = Dimension.deviceHeight * 0.85
const expandingTabCollapsedHeight: number = 72 * Dimension.scaleX

export const Styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.creamMedium
    },
    topBar: {
        height: Dimension.deviceHeight * 0.1,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.creamLight,
        borderBottomRightRadius: 40 * Dimension.scaleX
    },
    topBarTitle: {
        fontSize: FontSizes.h2,
        fontFamily: Fonts.persian.vazirBold
    },
    centerScrollViewContainer: {
        alignItems: 'center',
        paddingHorizontal: 28 * Dimension.scaleX,
        paddingTop: 16 * Dimension.scaleX,
        // expanding tab height is added to bottom padding to fix ScrollView bug, which is center container content
        // would go under expanding tab because its absolute positioned
        paddingBottom: expandingTabCollapsedHeight + 33 * Dimension.scaleX
    },
    name: {
        fontSize: FontSizes.h2,
        fontFamily: Fonts.persian.vazirMedium
    },
    rowCenterView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16 * Dimension.scaleX,
        paddingVertical: 8 * Dimension.scaleX
    },
    image: {
        width: 304 * Dimension.scaleX,
        height: 228 * Dimension.scaleX,
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
        height: 8 * Dimension.scaleX
    },
    /** height: 16 */
    mediumSpacer: {
        height: 16 * Dimension.scaleX
    },
    /** height: 24 */
    largeSpacer: {
        height: 24 * Dimension.scaleX
    },
    expandedStateTitle: {
        color: Colors.creamLight,
        fontFamily: Fonts.persian.vazirMedium
    },
    expandingTabContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: Colors.creamLight,
        borderTopLeftRadius: 40 * Dimension.scaleX,
        alignItems: 'center'
    },
    expandingTabExpandedContainer: {
        height: expandingTabExpandedHeight
    },
    expandingTabCollapsedContainer: {
        height: expandingTabCollapsedHeight,
        justifyContent: 'center'
    },
    expandingTabSafeTouch: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    expandingTabSafeTouchExpanded: {
        height: 40 * Dimension.scaleX
    },
    expandingTabSafeTouchCollapsed: {
        flex: 1
    },
    expandingTabCollapsedTitle: {
        fontFamily: Fonts.persian.vazirBold
    },
    expandingTabBackgroundContainer: {
        flexDirection: 'row',
        height: Dimension.deviceHeight - expandingTabExpandedHeight - Dimension.statusBarHeight,
        alignItems: 'center',
        paddingRight: 28 * Dimension.scaleX,
        paddingLeft: 48 * Dimension.scaleX
    }
})
