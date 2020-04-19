import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, GlobalStyles } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    disabledStyle: {
        opacity: 0.4
    },
    filledButtonContainerStyle: {
        backgroundColor: Colors.pink,
        borderRadius: 6 * Dimension.scaleX,
        ...GlobalStyles.shadow
    },
    notFilledButtonContainerStyle: {
        borderColor: Colors.mediumGray,
        borderStyle: 'dashed',
        borderWidth: 1.2 * Dimension.scaleX,
        borderRadius: 1 * Dimension.scaleX
    },
    containerStyle: {
        height: 48 * Dimension.scaleX,
        minWidth: 64 * Dimension.scaleX,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8 * Dimension.scaleX
    },
    filledButtonTextStyle: {
        color: Colors.white
    },
    notFilledButtonTextStyle: {
        color: Colors.greenDark
    },
    textStyle: {
        textAlign: 'center',
        paddingLeft: 4 * Dimension.scaleX,
        paddingRight: 4 * Dimension.scaleX,
        color: Colors.white
    }
})
