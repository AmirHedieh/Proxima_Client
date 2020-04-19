import {StyleSheet} from 'react-native'
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
        backgroundColor: Colors.white,
        color: Colors.greenDark,
        zIndex: 1
    },
    innerContainerStyle: {
        // height: '100%',
        justifyContent: 'center',
        backgroundColor: Colors.cardGray,
        // paddingHorizontal: 16 * Dimension.scaleX,
        borderRadius: 4 * Dimension.scaleX,
        // width: 280 * Dimension.scaleX,
        // height: 48 * Dimension.scaleX,
        ...GlobalStyles.shadow
    },
    errorStyle: {
        backgroundColor: Colors.white,
        marginHorizontal: 14 * Dimension.scaleX,
        fontSize: FontSizes.extraSmall,
        color: Colors.red,
        flexWrap: 'wrap'
    }
})
