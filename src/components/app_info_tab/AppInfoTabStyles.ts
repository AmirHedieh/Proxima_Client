import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, FontSizes } from '../../GlobalStyles'

export const fullTabHeight: number = 507 * Dimension.scaleY
export const collapsedTabHeight: number = Dimension.collapsedTabHeight

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
    logoImageContainer: {
        width: 52 * Dimension.scaleX,
        height: 52 * Dimension.scaleY
    },
    logoImage: {
        alignSelf: 'center',
        height: '100%',
        width: '100%'
    },
    title: {
        fontSize: FontSizes.h2
    }
})
