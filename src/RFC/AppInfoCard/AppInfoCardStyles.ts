import { StyleSheet } from 'react-native'
import { Dimension, Fonts, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        paddingVertical: 16 * Dimension.scaleY
    },
    wannaAppText: {
        fontSize: FontSizes.h2,
        fontFamily: Fonts.persian.vazirMedium
    },
    phoneText: {
        fontFamily: Fonts.persian.vazirMedium
    },
    whyAppText: {
        fontSize: FontSizes.h2,
        fontFamily: Fonts.persian.vazirBold
    },
    infoText: {
        paddingHorizontal: 16 * Dimension.scaleX,
        fontFamily: Fonts.persian.vazirMedium,
        textAlign: 'center'
    },
    rowContainer: {
        alignItems: 'center'
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
    },
    logoImageContainer: {
        width: 52 * Dimension.scaleX,
        height: 52 * Dimension.scaleY
    },
    logoImage: {
        alignSelf: 'center',
        height: '100%',
        width: '100%'
    }
})
