import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    contentContainerStyle: {
        width: Dimension.deviceWidth,
        height: 360 * Dimension.scaleX,
        minHeight: Dimension.deviceHeight * 0.4,
        maxHeight: Dimension.deviceHeight * 0.7,
        borderTopLeftRadius: 48 * Dimension.scaleX,
        borderTopRightRadius: 12 * Dimension.scaleX,
        backgroundColor: Colors.creamLight
    },
    safeTouchStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: Colors.dialogOverlay
    }
})
