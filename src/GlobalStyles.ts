import { Dimensions, StatusBar } from 'react-native'
import { Colors } from './Constants'

const targetWidth = 360
const targetHeight = 668

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

const scaleX = deviceWidth / targetWidth
const scaleY = deviceHeight / targetHeight

export const GlobalStyles = {
    shadow: {
        // android
        elevation: 3,
        // IOS
        shadowColor: Colors.black,
        shadowOpacity: 0.3,
        shadowRadius: 3,
        shadowOffset: {
            height: 0,
            width: 0
        }
    },
    spacer: {
        flex: 1
    },
    card: {
        backgroundColor: Colors.pureWhite,
        elevation: 5 * scaleX,
        shadowColor: Colors.black,
        shadowOpacity: 0.3 * scaleX,
        shadowRadius: 3 * scaleX,
        borderColor: Colors.lightGray,
        borderLeftWidth: scaleX,
        borderRightWidth: scaleX,
        borderRadius: 8 * scaleX
    },
    safeTouch: {
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        minWidth: 24 * scaleX,
        minHeight: 24 * scaleX
    },
    /** height: 4 */
    superSmallSpacer: {
        height: 4 * scaleY
    },
    /** height: 8 */
    smallSpacer: {
        height: 8 * scaleY
    },
    /** height: 16 */
    mediumSpacer: {
        height: 16 * scaleY
    },
    /** height: 24 */
    largeSpacer: {
        height: 24 * scaleY
    },
    separatorY: {
        width: '100%',
        height: 1 * scaleY,
        backgroundColor: Colors.creamMedium2
    }
}

export const Dimension = {
    statusBarHeight: StatusBar.currentHeight,
    deviceWidth,
    deviceHeight,
    fullSizeMenuItemWidth: 320 * scaleX,
    fullSizeMenuItemHeight: 35 * scaleX,
    baseContainerHeight: 44 * scaleX,
    longContainerHeight: 144 * scaleX,
    scaleX,
    scaleY,
    logoImageWidth: 112 * scaleX,
    logoImageHeight: 32 * scaleX,
    toolbarHeight: 56 * scaleX,
    toolbarIcon: 40 * scaleX,
    messageBarHeight: 32 * scaleY,
    collapsedTabHeight: 72 * scaleY
}

export const FontSizes = {
    /** 30 */
    h0: 30 * scaleX,
    /** 24 */
    h1: 24 * scaleX,
    /** 20 */
    h2: 20 * scaleX,
    /** 16 */
    h3: 16 * scaleX,
    /** 14 */
    p: 14 * scaleX,
    /** 12 */
    extraSmall: 12 * scaleX
}

export const Fonts = {
    persian: {
        vazir: 'Vazir',
        vazirMedium: 'Vazir Medium',
        vazirBold: 'Vazir Bold'
    },
    english: {
        openSansRegular: 'OpenSans-Regular'
    }
}
