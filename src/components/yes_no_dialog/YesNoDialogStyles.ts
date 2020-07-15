import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    baseDialog: {
        height: 256 * Dimension.scaleY,
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
        width: '100%',
        height: 120 * Dimension.scaleY
    },
    messageTextStyle: {
        paddingHorizontal: 12 * Dimension.scaleX,
        fontSize: FontSizes.h3
    },
    buttonContainer: {
        width: '100%'
    },
    buttonText: {
        color: Colors.primaryMedium
    },
    buttonSpacer: {
        width: 8 * Dimension.scaleX
    }
})
