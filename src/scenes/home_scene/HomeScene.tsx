import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { View } from 'react-native'
import { DomainViewModel } from '../../classes/DomainViewModel'
import { BaseScene } from '../base_scene/BaseScene'
import { ProductScene } from '../product_scene/ProductScene'
import { StoreInfoScene } from '../store_info_scene/StoreInfoScene'
import { Styles } from './HomeSceneStyles'

interface IHomeSceneProps {
    AppState: DomainViewModel
}
interface IHomeSceneState {}

@inject('AppState')
@observer
export class HomeScene extends BaseScene<IHomeSceneProps, IHomeSceneState> {
    protected async sceneWillUnmount() {
        await this.props.AppState.stopDetecting()
    }

    protected renderSafe(): JSX.Element {
        return <View style={{ flex: 1 }}>{this.renderContent()}</View>
    }
    protected onBackPress(): boolean {
        BackHandler.exitApp()
        return true
    }

    private renderContent(): JSX.Element {
        // return this.renderCurrentProduct()
        switch (this.props.AppState.getDetectionState()) {
            case 'FOUND_STORE_FOUND_BEACON':
                return this.renderCurrentProduct()
            default:
                // states: no store found | store found but no beacon
                return this.renderStoreInfo()
        }
    }

    private renderStoreInfo(): JSX.Element {
        return <StoreInfoScene />
    }

    private renderCurrentProduct(): JSX.Element {
        return <ProductScene />
    }
}
