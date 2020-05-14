import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    collapsedContainer: {
        width: '100%',
        height: 60,
        position: 'absolute',
        bottom: 0,
        backgroundColor: Colors.pureWhite,
        alignItems: 'center',
        justifyContent: 'center'
    },
    expandedContainer: {
        width: '100%',
        height: Dimension.deviceHeight * 0.8,
        position: 'absolute',
        bottom: 0,
        backgroundColor: Colors.pureWhite,
        alignItems: 'center'
    }
})
