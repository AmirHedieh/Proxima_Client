import { NavigationActions } from '../NavigationActions'
import { SceneParams } from '../SceneParams'
import { DetectionState } from '../Types'

export interface INavigationHandler {
    navigate: (state: string) => void
}
export class NavigationHandler implements INavigationHandler {
    private previousState: DetectionState = null

    constructor(initialState: DetectionState) {
        this.previousState = initialState
    }

    public navigate(detectionState: DetectionState) {
        NavigationActions.popTo(SceneParams.SplashScreen.name)
        switch (detectionState) {
            case 'NO_STORE_NO_BEACON': {
                NavigationActions.popTo(SceneParams.LookingStoreScene.name)
                break
            }
            case 'FOUND_STORE_NO_BEACON': {
                SceneParams.StoreInfoScene.navigate()
                break
            }
            case 'FOUND_STORE_FOUND_BEACON': {
                NavigationActions.push('fake', {
                    detectionState: 'Store is found'
                })
                break
            }
        }
    }
}
