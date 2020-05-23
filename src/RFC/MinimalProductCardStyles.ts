import { StyleSheet } from 'react-native'
import { Colors } from '../Constants'
import { Dimension, Fonts, FontSizes, GlobalStyles } from '../GlobalStyles'

const borderRadius: number = 25
const width: number = 140

export const Styles = StyleSheet.create({
    root: {
        paddingHorizontal: 12 * Dimension.scaleX
    },
    image: {
        width,
        height: 105 * Dimension.scaleX,
        borderTopRightRadius: borderRadius,
        borderTopLeftRadius: borderRadius
    },
    bottomContainer: {
        width,
        height: 68 * Dimension.scaleX,
        borderBottomRightRadius: borderRadius,
        borderBottomLeftRadius: borderRadius,
        paddingHorizontal: 12 * Dimension.scaleX,
        backgroundColor: Colors.pureWhite,
        ...GlobalStyles.shadow
    },
    title: {
        fontSize: FontSizes.p,
        fontFamily: Fonts.persian.vazirBold
    },
    price: {
        fontSize: FontSizes.p,
        fontFamily: Fonts.persian.vazirMedium
    }
})
