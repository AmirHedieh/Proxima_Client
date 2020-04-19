import { StyleSheet } from 'react-native'
import { Colors } from '../../Constants'
import { Dimension } from '../../GlobalStyles'

export const Styles = StyleSheet.create({
  toolbar: {
    flexDirection: 'row',
    paddingHorizontal: 16 * Dimension.scaleX,
    paddingVertical: 5 * Dimension.scaleX,
    height: Dimension.toolbarHeight,
    backgroundColor: Colors.white
  },
  leftPartStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  centerPartStyle: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rightPartStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  root: {
    width: Dimension.deviceWidth,
    flex: 1,
    alignContent: 'center',
    alignItems: 'center'
  }
})
