import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    mainContainerStyle: {
        minWidth: Dimension.deviceWidth * 0.6,
        minHeight: Dimension.deviceHeight * 0.3
    },
    centerContainerStyle: {
        backgroundColor: Colors.milky,
        paddingBottom: 0 * Dimension.scaleX,
        paddingHorizontal: 4 * Dimension.scaleX
    },
    titleStyle: {
        textAlign: 'center',
        color: Colors.greenDark,
        fontSize: FontSizes.h2
    },
    messageContainerStyle: {
        maxHeight: 281 * Dimension.scaleX
    },
    messageTextStyle: {
        paddingVertical: 16 * Dimension.scaleX,
        paddingHorizontal: 12 * Dimension.scaleX,
        fontSize: FontSizes.h3
    },
    buttonsSpacer: {
        height: 64 * Dimension.scaleX
    },
    buttonContainerStyle: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 8 * Dimension.scaleX,
        position: 'absolute',
        bottom: 0
    }
})
