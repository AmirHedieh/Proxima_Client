import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, GlobalStyles } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: Colors.creamLight,
        borderTopLeftRadius: 40 * Dimension.scaleX,
        alignItems: 'center'
    },
    collapsedContainer: {
        height: GlobalStyles.expandingTabCollapsedHeight,
        justifyContent: 'center'
    },
    expandedContainer: {
        height: Dimension.deviceHeight * 0.85
    },
    safeTouch: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    safeTouchCollapsed: {
        flex: 1
    },
    safeTouchExpanded: {
        height: 40 * Dimension.scaleX
    },
    collapsedTitle: {
        fontFamily: Fonts.persian.vazirBold
    }
})
