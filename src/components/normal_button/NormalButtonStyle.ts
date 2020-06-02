import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes, GlobalStyles } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    disabledStyle: {
        opacity: 0.4
    },
    containerStyle: {
        alignSelf: 'baseline',
        height: 48 * Dimension.scaleX,
        minWidth: 64 * Dimension.scaleX,
        backgroundColor: Colors.primaryMedium,
        borderRadius: 6 * Dimension.scaleX,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4 * Dimension.scaleX,
        ...GlobalStyles.shadow
    },
    textStyle: {
        textAlign: 'center',
        fontSize: FontSizes.h3,
        fontFamily: Fonts.persian.vazirMedium,
        color: Colors.creamLight
    }
})
