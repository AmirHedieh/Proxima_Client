import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    centerContainerStyle: {
        maxWidth: Dimension.deviceWidth * 0.85,
        maxHeight: Dimension.deviceHeight * 0.85,
        padding: 16 * Dimension.scaleX,
        borderRadius: 3 * Dimension.scaleX
    },
    safeTouchStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.dialogOverlay
    }
})
