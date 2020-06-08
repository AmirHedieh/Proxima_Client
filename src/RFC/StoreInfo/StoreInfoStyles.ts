import { StyleSheet } from 'react-native'
import { Dimension, Fonts, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    centerScrollViewContainer: {
        alignItems: 'center',
        paddingHorizontal: 28 * Dimension.scaleX,
        paddingTop: 16 * Dimension.scaleY,
        paddingBottom: 32 * Dimension.scaleY
    },
    name: {
        fontSize: FontSizes.h2,
        fontFamily: Fonts.persian.vazirMedium
    },
    rowCenterView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16 * Dimension.scaleX,
        paddingVertical: 8 * Dimension.scaleY
    },
    image: {
        width: 304 * Dimension.scaleX,
        height: 228 * Dimension.scaleY,
        borderRadius: 12 * Dimension.scaleX
    },
    phoneNumber: {
        fontFamily: Fonts.persian.vazirBold,
        fontSize: FontSizes.h2
    },
    info: {
        width: '100%'
    },
    contactText: {
        fontFamily: Fonts.persian.vazirMedium,
        fontSize: FontSizes.h2
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
