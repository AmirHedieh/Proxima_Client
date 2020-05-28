import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    root: {
        width: 48 * Dimension.scaleX,
        height: 48 * Dimension.scaleX,
        borderRadius: 10 * Dimension.scaleX,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.creamMedium
    }
})
