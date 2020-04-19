import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, Fonts, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    text: {
        color: Colors.grayContent,
        fontSize: FontSizes.p
    },
    imageView: {
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 16 * Dimension.scaleX
    },
    image: {
        borderRadius: 4 * Dimension.scaleX
    },
    textContainer: {
        justifyContent: 'center',
        marginHorizontal: 4 * Dimension.scaleX
    },
    typeText: {
        textAlign: 'center',
        textAlignVertical: 'center',
        height: 18 * Dimension.scaleX,
        fontSize: FontSizes.extraSmall,
        fontFamily: Fonts.persian.vazirMedium,
        color: Colors.darkBlack,
        borderBottomRightRadius: 4 * Dimension.scaleX,
        borderBottomLeftRadius: 4 * Dimension.scaleX,
        position: 'relative',
        bottom: 18
    },
    subProductTypographic: {
        justifyContent: 'center',
        alignSelf: 'center',
        fontSize: FontSizes.h2,
        textAlign: 'center',
        textAlignVertical: 'center',
        borderRadius: 4 * Dimension.scaleX
    }
})
