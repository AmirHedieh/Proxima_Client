import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension, FontSizes } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
    mainContainerStyle: {
        minWidth: Dimension.deviceWidth * 0.8,
        minHeight: Dimension.deviceHeight * 0.3,
        backgroundColor: Colors.backgroundColor
    },
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
    itemText: {
        alignSelf: 'center',
        fontSize: FontSizes.h3
    },
    itemTextUnSelected: {
        alignSelf: 'center',
        fontSize: FontSizes.h3,
        color: Colors.lightGray
    },
    selectView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    scrollView: {
        alignItems: 'center'
    },
    scrollViewWrapper:
    {
        flex: 1
    },
    unit: {
        alignSelf: 'center',
        textAlign: 'center',
        flex: 1
    },
    buttonsSpacer: {
        height: 64 * Dimension.scaleX
    },
    buttonContainerStyle: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 8 * Dimension.scaleX,
        position: 'absolute',
        bottom: 0
    },
    itemsView: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})
