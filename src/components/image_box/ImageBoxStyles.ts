import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    imageContainer: {
        margin: 2 * Dimension.scaleX,
        width: 100 * Dimension.scaleX,
        height: 120 * Dimension.scaleX
    },
    image: {
        borderRadius: 8 * Dimension.scaleX
    },
    closeSafeTouch: {
        alignSelf: 'baseline',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 1 * Dimension.scaleX,
        backgroundColor: Colors.milky,
        borderTopLeftRadius: 8 * Dimension.scaleX,
        borderBottomRightRadius: 8 * Dimension.scaleX
    },
    closeText: {
        color: Colors.red
    }
})
