import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes, GlobalStyles } from '../../GlobalStyles'

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
        paddingTop: 16 * Dimension.scaleX,
        // expanding tab height is added to bottom padding to fix ScrollView bug, which is center container content
        // would go under expanding tab because its absolute positioned
        paddingBottom: GlobalStyles.expandingTabCollapsedHeight + 33 * Dimension.scaleX
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
        width: '100%'
    },
    contactText: {
        fontFamily: Fonts.persian.vazirMedium,
        fontSize: FontSizes.h2
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
