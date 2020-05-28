import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    root: {
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
    }
})
