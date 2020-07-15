import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    root: {
        minWidth: 92 * Dimension.scaleX,
        minHeight: 56 * Dimension.scaleY,
        backgroundColor: Colors.creamMedium,
        borderRadius: 36 * Dimension.scaleX,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 8 * Dimension.scaleX,
        paddingVertical: 4 * Dimension.scaleY
    },
    text: {
        fontSize: FontSizes.h2,
        color: Colors.milky
    }
})
