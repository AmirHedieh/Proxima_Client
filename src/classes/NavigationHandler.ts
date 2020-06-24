import { NavigationActions } from '../NavigationActions'
import { SceneParams } from '../SceneParams'
import { DetectionState } from '../Types'

export interface INavigationHandler {
    navigate: (state: string) => void
}
export class NavigationHandler implements INavigationHandler {
    private currentState: DetectionState = null

    constructor(initialState: DetectionState) {
        this.currentState = initialState
    }

    public navigate(detectionState: DetectionState) {
        switch (detectionState) {
            case 'NO_STORE_NO_BEACON': {
                NavigationActions.popTo(SceneParams.LookingStoreScene.name)
                break
            }
            case 'FOUND_STORE_NO_BEACON': {
                if (this.currentState === 'FOUND_STORE_FOUND_BEACON') {
                    NavigationActions.pop()
                    break
                }
                SceneParams.StoreInfoScene.navigate()
                break
            }
            case 'FOUND_STORE_FOUND_BEACON': {
                SceneParams.ProductScene.navigate()
                break
            }
        }
        this.currentState = detectionState
    }
}
