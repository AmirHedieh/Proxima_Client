import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes } from '../../GlobalStyles'
import { stores } from '../../mobx/RootStore'

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
        paddingRight: stores.UIState.isRTL() ? 56 * Dimension.scaleX : 28 * Dimension.scaleX,
        paddingLeft: stores.UIState.isRTL() ? 28 * Dimension.scaleX : 56 * Dimension.scaleX
    },
    name: {
        fontSize: FontSizes.h1,
        fontFamily: Fonts.persian.vazirBold
    },
    price: {
        fontSize: FontSizes.h3,
        color: Colors.creamMedium2
    },
    note: {
        color: Colors.red
    }
})
