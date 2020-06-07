import { StyleSheet } from 'react-native'
import { Dimension } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    root: {
        alignItems: 'center'
    },
    rowContainer: {
        alignItems: 'center'
    },
    /** height: 8 */
    smallSpacer: {
        height: 8 * Dimension.scaleY
    },
    /** height: 16 */
    mediumSpacer: {
        height: 16 * Dimension.scaleY
    },
    /** height: 24 */
    largeSpacer: {
        height: 24 * Dimension.scaleY
    }
})
