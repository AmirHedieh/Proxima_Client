import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes, GlobalStyles } from '../../GlobalStyles'

const borderRadius: number = 25 * Dimension.scaleX
const height: number = 96 * Dimension.scaleX

export const Styles = StyleSheet.create({
    root: {
        width: '100%',
        height: 96 * Dimension.scaleY,
        marginVertical: 24 * Dimension.scaleY,
    },
    topContainer: {
        // flex: 1,
    },
    horizontalSeparator: {
        width: 1 * Dimension.scaleX,
        backgroundColor: Colors.creamDark
    },
    commentor: {
        borderTopRightRadius: 16 * Dimension.scaleX,
        borderTopLeftRadius: 16 * Dimension.scaleX,
        backgroundColor: Colors.creamLight,
        paddingVertical: 4 * Dimension.scaleX,
        paddingHorizontal: 8 * Dimension.scaleX,
        fontSize: FontSizes.p,
        color: Colors.creamDark
    },
    bottomContainer: {
        height,
        backgroundColor: Colors.creamLight,
        borderTopRightRadius: 0 * Dimension.scaleX,
        borderRadius: 8 * Dimension.scaleX,
    },
    text: {
        fontSize: FontSizes.extraSmall,
        padding: 16 * Dimension.scaleX
    },
    deleteButton: {
        padding: 8 * Dimension.scaleX,
        alignSelf: 'center'
    }
})
