import { StyleSheet } from 'react-native'
import { Dimension, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    labeledContainer: {

    },
    innerContainer: {
        height: Dimension.baseContainerHeight,
        paddingHorizontal: 14 * Dimension.scaleX
    },
    labeledContainerText: {
        fontSize: FontSizes.h3
    },
    dropDownIconContainer: {
        minWidth: 30 * Dimension.scaleX,
        minHeight: 24 * Dimension.scaleY,
        alignItems: 'center'
    }
})
