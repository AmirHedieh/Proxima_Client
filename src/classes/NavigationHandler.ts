import { NavigationActions } from '../NavigationActions'
import { DetectionState } from '../Types'

export interface INavigationHandler {
    navigate: (state: string) => void
}
export class NavigationHandler implements INavigationHandler {
    public navigate(detectionState: DetectionState) {
        switch (detectionState) {
            case 'FOUND_STORE_FOUND_BEACON': {
                NavigationActions.push('fake', {
                    detectionState: 'FOUND_STORE_FOUND_BEACON'
                })
                break
            }
            case 'FOUND_STORE_NO_BEACON': {
                NavigationActions.push('fake', {
                    detectionState: 'FOUND_STORE_NO_BEACON'
                })
            }
        }
    }
}
