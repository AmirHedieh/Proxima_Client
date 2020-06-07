import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#d09'
    },
    animationContainer: {
        width: 240,
        height: 240,
        borderRadius: 240,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: '#000'
    },
    animation: {
        width: 180 * Dimension.scaleX,
        height: 180 * Dimension.scaleY
    },
    title: {
        fontSize: FontSizes.h2,
        fontFamily: Fonts.persian.vazirBold,
        color: Colors.black
    },
    /** height: 8 */
    smallSpacer: {
        height: 8 * Dimension.scaleY
    },
    /** height: 16 */
    mediumSpacer: {
        height: 16 * Dimension.scaleY
    },
    /** height: 24 */
    largeSpacer: {
        height: 24 * Dimension.scaleY
    }
})
