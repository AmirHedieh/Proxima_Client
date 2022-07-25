import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes, GlobalStyles } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    backButton: {
        position: 'absolute',
        top: 24 * Dimension.scaleY,
        left: 16 * Dimension.scaleX,
        // backgroundColor: Colors.creamLight
    },
    /** height: 4 */
    superSmallSpacer: {
        height: 4 * Dimension.scaleX
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
    },
    root: {
        flex: 1,
        backgroundColor: Colors.milky,
        paddingBottom: Dimension.collapsedTabHeight
    },
    swiper: {
        width: '100%',
        height: 288 * Dimension.scaleY // image height + 18
    },
    image: {
        width: '100%',
        height: 270 * Dimension.scaleY
    },
    noImage: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.creamLight
    },
    noImageText: {
        color: Colors.creamDark,
        fontSize: FontSizes.h1
    },
    bottomContainer: {
        paddingRight: 56 * Dimension.scaleX,
        paddingLeft: 28 * Dimension.scaleX,
        paddingBottom: 32 * Dimension.scaleY
    },
    name: {
        fontSize: FontSizes.h1,
        fontFamily: Fonts.persian.vazirBold
    },
    creationTimeContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    creationTimeTitleText: {
        fontSize: FontSizes.p,
        color: Colors.creamMedium2
    },
    creationTimeText: {
        fontSize: FontSizes.h1,
        paddingHorizontal: 8 * Dimension.scaleX
    },
    mediumHorizontalSpacer: {
        width: 16 * Dimension.scaleX
    },
    creatorSeparator: {
        width: 3 * Dimension.scaleX,
        height: '100%',
        borderRadius: 2 * Dimension.scaleX,
        backgroundColor: Colors.creamMedium2
    },
    creatorTitleText: {
        fontSize: FontSizes.p,
        color: Colors.creamMedium2,
    },
    creatorText: {
        fontSize: FontSizes.h1,
        paddingHorizontal: 8 * Dimension.scaleX
    },
    optionsContainer: {
        width: '100%',
        height: Dimension.collapsedTabHeight,
        backgroundColor: Colors.creamLight,
        position: 'absolute',
        alignItems: 'center',
        bottom: 0
    },
    optionsButtonSafeTouch: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    optionsButtonDivider: {
        width: 1 * Dimension.scaleX,
        height: Dimension.collapsedTabHeight - 16 * Dimension.scaleY,
        backgroundColor: Colors.creamMedium2
    },
    optionsButtonText: {
        fontSize: FontSizes.h2,
        fontFamily: Fonts.persian.vazirMedium
    },
    expandCollapseText: {
        color: Colors.creamDark,
        textDecorationLine: 'underline'
    }
})
