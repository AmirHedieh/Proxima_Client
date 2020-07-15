import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    baseDialogNoImage: {
        height: 240 * Dimension.scaleY,
        minHeight: Dimension.deviceHeight * 0.2,
        maxHeight: Dimension.deviceHeight * 0.6
    },
    baseDialogWithImage: {
        height: 420 * Dimension.scaleY,
        minHeight: Dimension.deviceHeight * 0.5,
        maxHeight: Dimension.deviceHeight * 0.75
    },
    root: {
        paddingVertical: 16 * Dimension.scaleY,
        paddingHorizontal: 4 * Dimension.scaleX,
        alignItems: 'center'
    },
    titleStyle: {
        textAlign: 'center',
        color: Colors.greenDark,
        fontSize: FontSizes.h2,
        fontFamily: Fonts.persian.vazirMedium
    },
    centerContainerNoImage: {
        alignItems: 'center',
        maxHeight: 120 * Dimension.scaleY
    },
    centerContainerWithImage: {
        alignItems: 'center',
        maxHeight: 96 * Dimension.scaleY
    },
    messageTextStyle: {
        paddingVertical: 16 * Dimension.scaleY,
        paddingHorizontal: 12 * Dimension.scaleX,
        fontSize: FontSizes.h3
    },
    buttonContainerStyle: {
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    image: {
        width: 270 * Dimension.scaleX,
        height: 180 * Dimension.scaleY,
        borderRadius: 12 * Dimension.scaleX
    }
})
