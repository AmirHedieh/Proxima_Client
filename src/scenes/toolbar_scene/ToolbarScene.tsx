import React = require('react')
import { Image, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { BaseText } from '../../components/base_text/BaseText'
import { RoundComponent } from '../../components/round_component/RoundComponent'
import { SafeTouch } from '../../components/safe_touch/SafeTouch'
import { Dimension, GlobalStyles } from '../../GlobalStyles'
import { BaseScene, IBaseSceneProps } from '../base_scene/BaseScene'
import { Styles } from './ToolbarSceneStyles'

type ToolbarTypes = 'normal_toolbar'

// tslint:disable-next-line:no-empty-interface
export interface IToolbarSceneProps extends IBaseSceneProps { }

export interface IToolbarSceneParams {
  toolbarType?: ToolbarTypes,
  toolbarColor?: string,
  center?: {
    centerIcon?: string,
    centerImage?: any,
    centerText?: string,
    centerTint?: string,
    centerSize?: number,
    centerWidth?: string | number,
    centerHeight?: string | number,
    centerAvatar?: any,
    centerPartOnPress?: () => void,
    centerAvatarUrl?: string
  },
  left?: {
    leftIcon?: string | 'nothing',
    leftImage?: any,
    leftText?: string,
    leftTint?: string,
    leftSize?: number,
    leftWidth?: string | number,
    leftHeight?: string | number,
    leftPartOnPress?: () => void,
    leftAvatar?: any, // Url
    leftAvatarUrl?: string
  },
  right?: {
    rightIcon?: string,
    rightImage?: any,
    rightText?: string,
    rightTint?: string,
    rightSize?: number,
    rightWidth?: string | number,
    rightHeight?: string | number,
    rightPartOnPress?: () => void,
    rightAvatar?: any,
    rightAvatarUrl?: string
  }
}

export abstract class ToolbarScene<
  PassedProps extends IToolbarSceneProps,
  PassedState
  > extends BaseScene<PassedProps, PassedState> {

  protected overrideRenderRightPart: () => JSX.Element = null
  protected overrideRenderLeftPart: () => JSX.Element = null
  protected overrideRenderCenterPart: () => JSX.Element = null
  protected toolbarHasShadow = false
  protected hasSearchBar = false
  private params: IToolbarSceneParams
  private searchBarIsVisible: boolean = false
  /**
   * We set necessary params for toolbar here
   * It must be called from child scene inside constructor
   * @param data
   */
  public setSceneParams(data: IToolbarSceneParams) {
    this.params = {
      ...data
    }
  }
  /**
   * Called for updating toolbar scene params
   * @param data
   */
  public updateSceneParams(data: IToolbarSceneParams) {
    this.params = {
      ...this.params,
      ...data
    }
  }
  protected renderSafe(): JSX.Element {
    let leftPart = null
    let centerPart = null
    let rightPart = null

    if (this.overrideRenderLeftPart) {
      leftPart = this.overrideRenderLeftPart()
    }
    if (this.overrideRenderCenterPart) {
      centerPart = this.overrideRenderCenterPart()
    }
    if (this.overrideRenderRightPart) {
      rightPart = this.overrideRenderRightPart()
    }
    if (this.params) {
      leftPart = this.params.left ? this.renderSide(
        {
          icon:
            this.params.left.leftIcon ? this.params.left.leftIcon === 'nothing' ?
              null : this.params.left.leftIcon : 'angle-left',
          image: this.params.left.leftImage,
          text: this.params.left.leftText,
          tintColor: this.params.left.leftTint,
          width: this.params.left.leftWidth,
          height: this.params.left.leftHeight,
          size: this.params.left.leftSize,
          onPress: this.params.left.leftPartOnPress != null ? this.params.left.leftPartOnPress : this.onBackPress,
          avatar: this.params.left.leftAvatar,
          avatarUrl: this.params.left.leftAvatarUrl
        }
      ) : null
      centerPart = this.params.center ? this.renderSide(
        {
          icon: this.params.center.centerIcon,
          image: this.params.center.centerImage,
          text: this.params.center.centerText,
          tintColor: this.params.center.centerTint,
          width: this.params.center.centerWidth,
          height: this.params.center.centerHeight,
          size: this.params.center.centerSize,
          onPress: this.params.center.centerPartOnPress,
          avatar: this.params.center.centerAvatar,
          avatarUrl: this.params.center.centerAvatarUrl
        }
      ) : null
      rightPart = this.params.right ? this.renderSide(
        {
          icon: this.params.right.rightIcon,
          image: this.params.right.rightImage,
          text: this.params.right.rightText,
          tintColor: this.params.right.rightTint,
          width: this.params.right.rightWidth,
          height: this.params.right.rightHeight,
          size: this.params.right.rightSize,
          onPress: this.params.right.rightPartOnPress,
          avatar: this.params.right.rightAvatar,
          avatarUrl: this.params.right.rightAvatarUrl
        }
      ) : null
    }
    // const searchBar = renderSearchBar()
    // TODO We must place these elements inside block
    return(
      <View style={Styles.root}>
        {this.renderToolbar(leftPart, centerPart, rightPart)}
        {this.renderAfterToolbar()}
      </View>
    )
  }
  protected onSearchValueChanged(value: string): void { }
  /**
   * Child components must implement this methods
   */
  protected abstract renderAfterToolbar(): JSX.Element
  protected showExitDialog(): void {
    // Show exit dialog to user
  }
  protected changeSearchBarStatus(isVisible: boolean): void {
    // Called from child for changing
  }
  protected getSearchBarIsVisible(): boolean {
    return this.searchBarIsVisible
  }
  private renderToolbar(leftPart: JSX.Element, centerPart: JSX.Element, rightPart: JSX.Element) {
    const shadow = this.toolbarHasShadow ? GlobalStyles.shadow : null
    return (
      <View
        style={[
          Styles.toolbar,
          shadow
        ]}
      >
        <View style={Styles.leftPartStyle}>
          {leftPart}
        </View>

        <View style={Styles.centerPartStyle}>
          {centerPart}
        </View>

        <View style={Styles.rightPartStyle}>
          {rightPart}
        </View>
      </View>
    )
  }
  // /**
  //  * Search edit text calls this method
  //  * @param value
  //  */
  // private privateOnSearchValueChanged(value: string): void {
  //   // We call onSearchValueChanged and do some process on text
  //   // Ex: this.onSearchValueChanged(value)
  // }
  // private onCloseAndClearSearchBarPressed(): void {
  //   // Called when search bar close is pressed
  // }
  private renderSide(params: {
    icon: string,
    image: any,
    text: string,
    tintColor: string,
    width: number | string,
    height: number | string,
    size: number,
    onPress: () => void,
    avatar: any,
    avatarUrl: string
  }): JSX.Element {
    if (params.icon) {
      return (
        <SafeTouch
          onPress={params.onPress}
        >
          <Icon
            name={params.icon}
            size={params.size || Dimension.toolbarIcon}
            color={params.tintColor}
          />
        </SafeTouch>
      )
    }
    if (params.text) {
      return (
        <SafeTouch
          onPress={params.onPress}
        >
          <BaseText
            style={{
              fontSize: params.size,
              color: params.tintColor
            }}
            text={params.text}
          />
        </SafeTouch>
      )
    }
    if (params.image) {
      return (
        <SafeTouch
          onPress={params.onPress}
        >
          <Image
            style={{
              width: params.width,
              height: params.height
            }}
            source={params.image}
          />
        </SafeTouch>
      )
    }
    if (params.avatar) {
      return (
        <RoundComponent
          text='icon'
        />
      )
    }
    if (params.avatarUrl) {
      return (
        <RoundComponent
          image={{ uri: params.avatarUrl }}
        />
      )
    }
    return null
  }
}
