import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.milky
    },
    backButton: {
        position: 'absolute',
        left: 20,
        top: 16
    },
    image: {
        width: '100%',
        height: 270 * Dimension.scaleX
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
    },
    noteTitle: {
        fontFamily: Fonts.persian.vazirBold,
        textAlign: 'center',
        color: Colors.red
    },
    noteMessage: {
        textAlign: 'center',
        color: Colors.red
    }
})
