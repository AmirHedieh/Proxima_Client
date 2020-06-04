import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    root: {
        width: 70 * Dimension.scaleX,
        height: 88 * Dimension.scaleY,
        backgroundColor: Colors.primaryDark,
        position: 'absolute',
        bottom: 16,
        right: 0,
        borderTopLeftRadius: 48 * Dimension.scaleX,
        borderBottomLeftRadius: 12 * Dimension.scaleX
    },
    rootSafeTouch: {
        flex: 1,
        paddingLeft: 22 * Dimension.scaleX,
        paddingRight: 18 * Dimension.scaleX,
        paddingVertical: 28 * Dimension.scaleY
    }
})
