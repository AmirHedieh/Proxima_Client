import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes, GlobalStyles } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    mainContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    labelStyle: {
        marginHorizontal: 14 * Dimension.scaleX,
        marginBottom: 2 * Dimension.scaleX,
        fontSize: FontSizes.extraSmall,
        fontFamily: Fonts.persian.vazirBold,
        zIndex: 1
    },
    innerContainerStyle: {
        // height: '100%',
        justifyContent: 'center',
        backgroundColor: Colors.pureWhite,
        // paddingHorizontal: 16 * Dimension.scaleX,
        borderRadius: 36 * Dimension.scaleX
        // width: 280 * Dimension.scaleX,
        // height: 48 * Dimension.scaleX,
        // ...GlobalStyles.shadow
    },
    errorStyle: {
        marginHorizontal: 14 * Dimension.scaleX,
        fontSize: FontSizes.extraSmall,
        color: Colors.red,
        flexWrap: 'wrap'
    }
})
