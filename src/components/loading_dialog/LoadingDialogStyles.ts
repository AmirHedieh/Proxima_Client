import {StyleSheet} from 'react-native'
import { Colors } from '../../Constants'
import {Dimension} from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    centerContainerStyle: {
        backgroundColor: Colors.white,
        minWidth: Dimension.deviceWidth * 0.7,
        maxWidth: Dimension.deviceWidth * 0.8,
        minHeight: Dimension.deviceHeight * 0.2,
        maxHeight: Dimension.deviceHeight * 0.3
    }
})
