import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#df0'
    },
    topBar: {
        height: 72 * Dimension.scaleX,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.pureWhite,
        borderBottomRightRadius: 40 * Dimension.scaleX
    },
    centerContainer: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 28 * Dimension.scaleX,
        paddingVertical: 16 * Dimension.scaleX
    },
    name: {
        fontSize: FontSizes.h2,
        fontFamily: Fonts.persian.vazirMedium
    },
    rowCenterView: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16 * Dimension.scaleX,
        paddingVertical: 8 * Dimension.scaleX
    },
    image: {
        width: 304 * Dimension.scaleX,
        height: 228 * Dimension.scaleX,
        borderRadius: 12 * Dimension.scaleX
    },
    phoneNumber: {
        fontFamily: Fonts.persian.vazirBold,
        fontSize: FontSizes.h2
    },
    info: {
        // width: '100%',
        backgroundColor: '#ff0'
    },
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
    }
})
