import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    /** height: 4 */
    superSmallSpacer: {
        height: 4 * Dimension.scaleX
    },
    /** height: 8 */
    smallSpacer: {
        height: 8 * Dimension.scaleX
    },
    /** height: 16 */
    mediumSpacer: {
        height: 16 * Dimension.scaleX
    },
    /** height: 24 */
    largeSpacer: {
        height: 24 * Dimension.scaleX
    },
    root: {
        flex: 1,
        backgroundColor: Colors.milky
    },
    image: {
        flex: 1
    },
    bottomContainer: {
        flex: 1,
        paddingTop: 24 * Dimension.scaleX,
        paddingBottom: 32 * Dimension.scaleX,
        paddingRight: 56 * Dimension.scaleX,
        paddingLeft: 28 * Dimension.scaleX
    },
    name: {
        fontSize: FontSizes.h1,
        fontFamily: Fonts.persian.vazirBold
    },
    price: {
        fontSize: FontSizes.h3,
        color: Colors.creamMedium2
    },
    materialsContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bodyMaterialTitleText: {
        fontSize: FontSizes.p,
        color: Colors.creamMedium
    },
    bodyMaterialText: {
        fontSize: 28 * Dimension.scaleX,
        paddingHorizontal: 8 * Dimension.scaleX
    },
    bodyClothSpacer: {
        width: 22 * Dimension.scaleX
    },
    bodyClothSeparator: {
        width: 3 * Dimension.scaleX,
        height: 36 * Dimension.scaleX,
        borderRadius: 2 * Dimension.scaleX,
        backgroundColor: Colors.creamMedium2
    },
    clothMaterialTitleText: {
        fontSize: FontSizes.p,
        color: Colors.creamMedium
    },
    clothMaterialText: {
        fontSize: 28 * Dimension.scaleX,
        paddingHorizontal: 8 * Dimension.scaleX
    }
})
