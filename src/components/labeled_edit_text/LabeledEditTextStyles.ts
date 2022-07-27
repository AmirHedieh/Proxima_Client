import { StyleSheet } from 'react-native'
import { Dimension, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    labeledContainer: {
        width: Dimension.fullSizeMenuItemWidth
    },
    innerContainer: {},
    editText: {
        width: Dimension.fullSizeMenuItemWidth,
        height: Dimension.baseContainerHeight,
        paddingVertical: 8 * Dimension.scaleX,
        paddingHorizontal: 14 * Dimension.scaleX,
        fontSize: FontSizes.h3,
        textAlign: 'center'
    }
})
