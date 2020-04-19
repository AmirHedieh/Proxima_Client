import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    Button: {
        width: 50 * Dimension.scaleX,
        height: 50 * Dimension.scaleX,
        borderRadius: 50 * Dimension.scaleX,
        backgroundColor: Colors.pink,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 25 * Dimension.scaleX,
        right: 10 * Dimension.scaleX
    },
    icon: {
        color: Colors.white
    }
})
