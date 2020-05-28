import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { View } from 'react-native'
import { DomainViewModel } from '../../classes/DomainViewModel'
import { BaseText } from '../../components/base_text/BaseText'
import { NavigationActions } from '../../NavigationActions'
import { BaseScene, IBaseSceneState } from '../base_scene/BaseScene'

interface IProductSceneProps {
    AppState?: DomainViewModel
    productId: number
}

@inject('AppState')
@observer
export class ProductScene extends BaseScene<IProductSceneProps, IBaseSceneState> {
    public renderSafe(): JSX.Element {
        const product = this.props.AppState.getCurrentProduct()
        return (
            <View>
                <BaseText text={'Found beacon!'} />
                <BaseText text={`id: ${product?.id}`} />
                <BaseText text={`name: ${product?.productName}`} />
            </View>
        )
    }
    protected onBackPress(): boolean {
        NavigationActions.pop()
        return true
    }
}
