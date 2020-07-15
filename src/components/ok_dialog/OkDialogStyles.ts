import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    baseDialog: {
        height: 240 * Dimension.scaleY,
        minHeight: Dimension.deviceHeight * 0.2,
        maxHeight: Dimension.deviceHeight * 0.5
    },
    centerContainerStyle: {
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
    messageContainerStyle: {
        maxHeight: 120 * Dimension.scaleY
    },
    messageTextStyle: {
        paddingVertical: 16 * Dimension.scaleY,
        paddingHorizontal: 12 * Dimension.scaleX,
        fontSize: FontSizes.h3
    },
    buttonContainerStyle: {
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
})
