import * as React from 'react'
import { View } from 'react-native'
import { NavigationActions } from '../../NavigationActions'
import { BaseScene, IBaseSceneState } from '../base_scene/BaseScene'

interface IMinimalProductSceneProps {}

export class MinimalProductScene extends BaseScene<IMinimalProductSceneProps, IBaseSceneState> {
    public renderSafe(): JSX.Element {
        return <View />
    }
    protected onBackPress(): boolean {
        NavigationActions.pop()
        return true
    }
}
