import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    mainContainerStyle: {
        minWidth: Dimension.deviceWidth * 0.75,
        maxWidth: Dimension.deviceWidth * 0.8
        // minHeight: Dimension.deviceHeight * 0.3
    },
    centerContainerStyle: {
        backgroundColor: Colors.milky,
        paddingBottom: 0 * Dimension.scaleX,
        paddingHorizontal: 4 * Dimension.scaleX
    },
    titleStyle: {
        textAlign: 'center',
        color: Colors.greenDark,
        fontSize: FontSizes.h3
    },
    headerSpacer: {
        height: 26 * Dimension.scaleX
    },
    buttonsSpacer: {
        height: 64 * Dimension.scaleX
    },
    buttonContainerStyle: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 8 * Dimension.scaleX,
        position: 'absolute',
        bottom: 0
    },
    editText: {
        width: Dimension.fullSizeMenuItemWidth,
        height: Dimension.fullSizeMenuItemHeight,
        fontSize: FontSizes.h3
    },
    passwordContainer: {
        marginHorizontal: 16 * Dimension.scaleX,
        marginTop: 28 * Dimension.scaleX,
        marginBottom: 16 * Dimension.scaleX
    },
    button: {
        borderColor: Colors.mediumGray,
        borderStyle: null,
        borderWidth: 0,
        borderRadius: 0
    },
    showPasswordSafeTouch: {
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: 24 * Dimension.scaleX,
        minHeight: 24 * Dimension.scaleX
    },
    passwordEditText: {
        width: Dimension.deviceWidth * 0.5,
        height: 44,
        textAlign: 'center'
    },
    iconEditTextView: {
        paddingHorizontal: 16 * Dimension.scaleX,
        flexDirection: 'row',
        alignItems: 'center'
    }
})
