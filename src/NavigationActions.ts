import {Actions} from 'react-native-router-flux'

export class NavigationActions {
    public static push(sceneKey: string, params?: any) {
        Actions.push(sceneKey, params)
    }
    public static pop() {
        Actions.pop()
    }
    public static reset(sceneKey: string, params?: any) {
        Actions.reset(sceneKey, params)
    }
    public static popTo(sceneKey: string, params?: any) {
        Actions.popTo(sceneKey, params)
    }
}
