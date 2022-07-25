import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
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
        borderColor: Colors.creamDark,
        borderWidth: 2 * Dimension.scaleX,
        borderRadius: 8 * Dimension.scaleX,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16 * Dimension.scaleX,
        paddingVertical: 8 * Dimension.scaleY
    },
    noImageText: {
        fontSize: FontSizes.h1,
        color: Colors.creamDark,
        flex: 1
    },
    image: {
        width: 304 * Dimension.scaleX,
        height: 228 * Dimension.scaleY,
        alignItems: 'center',
        borderRadius: 12 * Dimension.scaleX,
        overflow: 'hidden',
        backgroundColor: Colors.creamLight
    },
    informationContainer: {
        width: '100%',
        // padding: 16 * Dimension.scaleX,
        // borderRadius: 16 * Dimension.scaleX,
        // backgroundColor: Colors.creamLight
    },
    phoneNumber: {
        fontFamily: Fonts.persian.vazirBold,
        fontSize: FontSizes.h2
    },
    infoTitle: {
        paddingHorizontal: 16 * Dimension.scaleX,
        paddingTop: 8 * Dimension.scaleX,
        paddingBottom: 4 * Dimension.scaleX,
        borderTopColor: Colors.creamDark,
        borderLeftColor: Colors.creamDark,
        borderRightColor: Colors.creamDark,
        borderTopWidth: 2 * Dimension.scaleX,
        borderLeftWidth: 2 * Dimension.scaleX,
        borderRightWidth: 2 * Dimension.scaleX,
        borderTopLeftRadius:16 * Dimension.scaleX,
        borderTopRightRadius:16 * Dimension.scaleX
    },
    info: {
        width: '100%',
        padding: 16 * Dimension.scaleX,
        borderRadius: 16 * Dimension.scaleX,
        borderTopRightRadius: 0 * Dimension.scaleX,
        backgroundColor: Colors.creamLight
    },
    contactText: {
        fontFamily: Fonts.persian.vazirBold,
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
    },
    button: {
        width: '100%',
        backgroundColor: Colors.primaryLight
    },
    buttonSpacer: {
        width: 16 * Dimension.scaleX
    },
    editImageSafeTouch: {
        width: '100%',
        height: 32 * Dimension.scaleY,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#adadadaa'
    }
})
