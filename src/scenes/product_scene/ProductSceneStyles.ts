import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    /** height: 8 */
    smallSpacer: {
        height: 8 * Dimension.scaleX
    },
    /** height: 16 */
    mediumSpacer: {
        height: 16 * Dimension.scaleX
    },
    /** height: 24 */
    largeSpacer: {
        height: 24 * Dimension.scaleX
    },
    root: {
        flex: 1,
        backgroundColor: Colors.milky
    },
    image: {
        flex: 1
    },
    bottomContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 40 * Dimension.scaleX,
        paddingBottom: 32 * Dimension.scaleX,
        paddingHorizontal: 28 * Dimension.scaleX
    },
    name: {
        fontSize: FontSizes.h1,
        fontFamily: Fonts.persian.vazirBold
    },
    price: {
        fontSize: FontSizes.h3,
        color: Colors.creamMedium2
    }
})
