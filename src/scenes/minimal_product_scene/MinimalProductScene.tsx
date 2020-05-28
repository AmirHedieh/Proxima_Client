import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { View } from 'react-native'
import { DomainViewModel } from '../../classes/DomainViewModel'
import { BaseText } from '../../components/base_text/BaseText'
import { NavigationActions } from '../../NavigationActions'
import { BaseScene, IBaseSceneState } from '../base_scene/BaseScene'
import { IMinimalProduct } from '../../models/MinimalProduct'

export interface IMinimalProductSceneProps extends IMinimalProduct {}

@inject('AppState')
@observer
export class MinimalProductScene extends BaseScene<IMinimalProductSceneProps, IBaseSceneState> {
    public renderSafe(): JSX.Element {
        return (
            <View>
                <BaseText text={product.id} />
                <BaseText text={product.info} />
                <BaseText text={product.name} />
            </View>
        )
    }
    protected onBackPress(): boolean {
        NavigationActions.pop()
        return true
    }
}
