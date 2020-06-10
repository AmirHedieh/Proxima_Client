import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes, GlobalStyles } from '../../GlobalStyles'

const borderRadius: number = 25 * Dimension.scaleX
const width: number = 140 * Dimension.scaleX

export const Styles = StyleSheet.create({
    root: {
        paddingHorizontal: 12 * Dimension.scaleX
    },
    image: {
        width,
        height: 105 * Dimension.scaleY,
        borderTopRightRadius: borderRadius,
        borderTopLeftRadius: borderRadius
    },
    bottomContainer: {
        width,
        borderBottomRightRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
        paddingHorizontal: 12 * Dimension.scaleX,
        paddingVertical: 12 * Dimension.scaleY,
        backgroundColor: Colors.pureWhite,
        ...GlobalStyles.shadow
    },
    title: {
        fontSize: FontSizes.p,
        fontFamily: Fonts.persian.vazirBold
    },
    price: {
        fontSize: FontSizes.p,
        fontFamily: Fonts.persian.vazirMedium,
        color: Colors.creamMedium2
    }
})
