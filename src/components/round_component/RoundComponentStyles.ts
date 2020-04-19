import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    containerStyle: {
        // flex: 1,
        width: 40 * Dimension.scaleX,
        height: 40 * Dimension.scaleX,
        borderRadius: 100 * Dimension.scaleX,
        borderWidth: 1.5 * Dimension.scaleX,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: Colors.lightGray,
        backgroundColor: Colors.white
    },
    imageStyle: {
        width: 40 * Dimension.scaleX,
        height: 40 * Dimension.scaleX,
        borderRadius: 100 * Dimension.scaleX
    },
    textStyle: {
        fontSize: FontSizes.p
    }
})
