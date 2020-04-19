import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    container: {
        width: Dimension.deviceWidth,
        height: Dimension.messageBarHeight,
        backgroundColor: Colors.yellowLight,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {

    }
})
