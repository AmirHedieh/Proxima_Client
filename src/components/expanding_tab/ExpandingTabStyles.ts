import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    container: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        backgroundColor: Colors.pureWhite,
        alignItems: 'center'
    },
    collapsedContainer: {
        height: 60,
        justifyContent: 'center'
    },
    expandedContainer: {
        height: Dimension.deviceHeight * 0.8
    }
})
