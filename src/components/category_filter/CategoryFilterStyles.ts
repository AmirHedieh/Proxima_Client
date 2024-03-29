import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    root: {
        width: 70 * Dimension.scaleX,
        height: 88 * Dimension.scaleY,
        backgroundColor: Colors.primaryMedium,
        position: 'absolute',
        bottom: 16,
        right: 0,
        overflow: 'hidden',
        borderTopLeftRadius: 48 * Dimension.scaleX,
        borderBottomLeftRadius: 12 * Dimension.scaleX
    },
    rootOpenNoSelection: {
        width: 312 * Dimension.scaleX
    },
    rootOpenWithSelection: {
        width: 312 * Dimension.scaleX,
        height: 152 * Dimension.scaleY
    },
    rootCloseWithSelection: {
        width: 312 * Dimension.scaleX
    },
    rootSafeTouch: {
        flex: 1,
        paddingLeft: 22 * Dimension.scaleX,
        paddingRight: 18 * Dimension.scaleX,
        paddingVertical: 28 * Dimension.scaleY
    },
    expandedContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 16 * Dimension.scaleX
    },
    selectedCategoriesFlatListContainer: {
        flex: 1,
        alignItems: 'flex-end' // start from right
    },
    selectedCategoriesFlatListContentContainer: {
        alignItems: 'center'
    },
    categoryItemContainer: {
        height: 56 * Dimension.scaleY,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20 * Dimension.scaleX,
        paddingHorizontal: 12 * Dimension.scaleX,
        paddingVertical: 16 * Dimension.scaleY,
        backgroundColor: Colors.primaryLight
    },
    categoryItemText: {
        fontSize: FontSizes.h3,
        fontFamily: Fonts.persian.vazirMedium,
        color: Colors.creamLight
    },
    selectedFlatListContentContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    selectedItemWrapper: {
        backgroundColor: Colors.creamMedium,
        borderLeftWidth: 0,
        paddingLeft: 4
    },
    selectedCategoryItemContainer: {
        // minWidth: 48 * Dimension.scaleX,
        height: 48 * Dimension.scaleY,
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 12 * Dimension.scaleX,
        paddingRight: 12 * Dimension.scaleX,
        paddingVertical: 16 * Dimension.scaleY,
        backgroundColor: Colors.creamMedium,
        borderTopLeftRadius: 32 * Dimension.scaleX,
        borderBottomLeftRadius: 32 * Dimension.scaleX,
        elevation: 6
    },
    selectedCategoryItemText: {
        fontSize: FontSizes.h3,
        fontFamily: Fonts.persian.vazirMedium,
        color: Colors.primaryDark
    },
    noMoreCategoryContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    noMoreCategoryText: {
        fontSize: FontSizes.h2,
        color: Colors.creamLight
    }
})
