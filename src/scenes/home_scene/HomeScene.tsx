import * as React from 'react'
import { View } from 'react-native'
import { BaseScene } from '../base_scene/BaseScene'
import { Styles } from './HomeSceneStyles'
export class HomeScene<IHomeSceneProps, IHomeSceneState> extends BaseScene<IHomeSceneProps, IHomeSceneState> {
    protected onBackPress(): boolean {
        return true
    }
    protected renderSafe(): JSX.Element {
        return <View />
    }
}
