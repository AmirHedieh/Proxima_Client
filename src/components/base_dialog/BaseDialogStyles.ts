import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    centerContainerStyle: {
        width: Dimension.deviceWidth,
        minHeight: Dimension.deviceHeight * 0.3,
        maxHeight: Dimension.deviceHeight * 0.85,
        borderTopLeftRadius: 50 * Dimension.scaleX,
        borderTopRightRadius: 10 * Dimension.scaleX,
        paddingTop: 12 * Dimension.scaleX,
        paddingHorizontal: 12 * Dimension.scaleX,
        backgroundColor: Colors.pureWhite
    },
    safeTouchStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: Colors.dialogOverlay
    }
})
