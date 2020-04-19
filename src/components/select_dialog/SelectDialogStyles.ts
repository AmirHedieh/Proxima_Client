import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    angleDown: {
        fontSize: FontSizes.h2,
        marginLeft: 8 * Dimension.scaleX,
        marginTop: 4 * Dimension.scaleY
    },
    checkboxIcon: {
        fontSize: FontSizes.h3
    },
    header: {
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 7 * Dimension.scaleY,
        color: Colors.textGreenColor
    },
    description: {
        fontSize: 16,
        marginBottom: 10 * Dimension.scaleY
    },
    itemContainer: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 5 * Dimension.scaleY,
        marginRight: 15 * Dimension.scaleX,
        marginLeft: 15 * Dimension.scaleX,
        borderBottomWidth: 1,
        borderBottomColor: Colors.lightGray
    },
    itemText: {
        marginBottom: 10 * Dimension.scaleY,
        fontSize: FontSizes.h3,
        alignSelf: 'flex-end'
    }
})
