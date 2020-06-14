import * as React from 'react'
import { View } from 'react-native'
import { IBaseDialogProps, IBaseDialogState } from '../../components/base_dialog/BaseDialog'
import { BaseScene } from '../base_scene/BaseScene'
import { AppInfoTab } from '../../components/app_info_tab/AppInfoTab'

export class LookingStoreScene extends BaseScene<IBaseDialogProps, IBaseDialogState> {
    public renderSafe(): JSX.Element {
        return <AppInfoTab />
    }

    protected onBackPress(): boolean {
        return true
    }
}
