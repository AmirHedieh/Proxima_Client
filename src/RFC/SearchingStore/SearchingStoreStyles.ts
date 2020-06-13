import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    animationContainer: {
        width: 240 * Dimension.scaleX,
        height: 240 * Dimension.scaleY,
        borderRadius: 240 * Dimension.scaleX,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 4 * Dimension.scaleX,
        borderColor: '#000'
    },
    image: {
        width: 160 * Dimension.scaleX,
        height: 122.5 * Dimension.scaleY
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
