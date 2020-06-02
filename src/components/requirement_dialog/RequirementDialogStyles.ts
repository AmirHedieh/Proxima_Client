import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 32 * Dimension.scaleY,
        paddingRight: 28 * Dimension.scaleX,
        paddingLeft: 30 * Dimension.scaleX
    },
    messageContainer: {
        alignItems: 'center'
    },
    messageText: {
        flexShrink: 1,
        fontSize: FontSizes.h2,
        fontFamily: Fonts.persian.vazirBold
    },
    bottomContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconContainer: {
        width: 160 * Dimension.scaleY,
        height: 160 * Dimension.scaleY,
        borderRadius: 160 * Dimension.scaleY,
        borderWidth: 4 * Dimension.scaleX,
        borderColor: Colors.black,
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
})
