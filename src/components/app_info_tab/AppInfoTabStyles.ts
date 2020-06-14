import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension } from '../../GlobalStyles'

export const fullTabHeight: number = 472 * Dimension.scaleY
export const collapsedTabHeight: number = 72 * Dimension.scaleY

export const Styles = StyleSheet.create({
    root: {
        width: '100%',
        height: fullTabHeight,
        position: 'absolute',
        backgroundColor: Colors.creamLight,
        borderBottomRightRadius: 48 * Dimension.scaleX,
        borderBottomLeftRadius: 12 * Dimension.scaleX
    },
    safeTouch: {
        width: '100%',
        height: collapsedTabHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoImage: {
        width: 52.5 * Dimension.scaleX,
        height: 52 * Dimension.scaleY
    }
})
