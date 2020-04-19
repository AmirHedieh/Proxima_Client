import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, FontSizes, GlobalStyles } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    container: {
        ...GlobalStyles.shadow,
        flexDirection: 'row',
        minWidth: 32 * Dimension.scaleX,
        height: 28 * Dimension.scaleX,
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4 * Dimension.scaleX,
        marginTop: 6 * Dimension.scaleX,
        marginBottom: 2 * Dimension.scaleX,
        marginHorizontal: 6 * Dimension.scaleX
    },
    text: {
        color: Colors.greenDark,
        fontSize: FontSizes.extraSmall
    }
})
