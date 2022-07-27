import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes, GlobalStyles } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: Colors.creamMedium,
    },
    flatList: {
        paddingBottom: 32 * Dimension.scaleY
    },
    flatListContainer: {
        paddingTop: Dimension.collapsedTabHeight,
        paddingHorizontal: 16 * Dimension.scaleX,
    },
    noCommentText: {
        marginTop: 32 * Dimension.scaleY,
        alignSelf: 'center',
        fontSize: FontSizes.h1,
        color: Colors.creamDark
    }
})
