import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.creamMedium
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bottomTabContainer: {
        flexDirection: 'row',
        width: '100%',
        height: Dimension.collapsedTabHeight,
        position: 'absolute',
        bottom: 0,
        paddingRight: 28 * Dimension.scaleX,
        paddingLeft: 25 * Dimension.scaleX,
        alignItems: 'center',
        backgroundColor: Colors.creamLight,
        borderTopLeftRadius: 48 * Dimension.scaleX,
        borderTopRightRadius: 12 * Dimension.scaleX
    },
    bottomTabTitle: {
        flex: 1,
        textAlign: 'center',
        fontSize: FontSizes.h3,
        fontFamily: Fonts.persian.vazirBold
    }
})
