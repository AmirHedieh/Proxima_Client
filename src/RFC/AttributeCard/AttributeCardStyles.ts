import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    columnLine: {
        width: 3 * Dimension.scaleX,
        height: '100%',
        borderRadius: 2 * Dimension.scaleX,
        backgroundColor: Colors.blueDark
    },
    title: {
        fontSize: FontSizes.p,
        color: Colors.creamMedium2,
    },
    description: {
        fontSize: FontSizes.h3,
        paddingHorizontal: 8 * Dimension.scaleX,
    },
    mediumHorizontalSpacer: {
        width: 16 * Dimension.scaleX
    },
})
