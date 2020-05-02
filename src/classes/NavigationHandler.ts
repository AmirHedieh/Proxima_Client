import { NavigationActions } from '../NavigationActions'
import { SceneParams } from '../SceneParams'
import { DetectionState } from '../Types'

export interface INavigationHandler {
    navigate: (state: string) => void
}
export class NavigationHandler implements INavigationHandler {
    public navigate(detectionState: DetectionState) {
        NavigationActions.popTo(SceneParams.SplashScreen.name)
        switch (detectionState) {
            case 'FOUND_STORE_FOUND_BEACON': {
                NavigationActions.push('fake', {
                    detectionState: 'Store is found'
                })
                break
            }
            case 'FOUND_STORE_NO_BEACON': {
                NavigationActions.push('fake', {
                    detectionState: 'Beacon is found'
                })
            }
        }
    }
}
