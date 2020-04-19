import {StyleSheet} from 'react-native'
import {Dimension} from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    image:  {
        width: 100 * Dimension.scaleX,
        height: 100 * Dimension.scaleY
    },
    lottie: {
        width: 100 * Dimension.scaleX,
        height: 100 * Dimension.scaleY,
        alignItems: 'center',
        justifyContent: 'center'
    }
})
