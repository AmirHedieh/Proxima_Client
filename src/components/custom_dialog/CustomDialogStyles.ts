import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    mainContainerStyle: {
        minWidth: Dimension.deviceWidth * 0.6,
        minHeight: Dimension.deviceHeight * 0.25
    },
    titleStyle: {
        textAlign: 'center',
        color: Colors.greenDark,
        fontSize: FontSizes.h2
    },
    centerContainerStyle: {
        backgroundColor: Colors.milky,
        paddingHorizontal: 4 * Dimension.scaleX
    }
})
