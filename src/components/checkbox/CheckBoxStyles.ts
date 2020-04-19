import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    safeTouch: {
        width: 24 * Dimension.scaleX,
        height: 24 * Dimension.scaleX,
        justifyContent: 'center',
        alignItems: 'center'
    },
    checkBoxContainer: {
        margin: 2 * Dimension.scaleX,
        width: 16 * Dimension.scaleX,
        height: 16 * Dimension.scaleX,
        borderWidth: 1.2 * Dimension.scaleX,
        borderRadius: 2 * Dimension.scaleX,
        borderColor: Colors.mediumGray,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
