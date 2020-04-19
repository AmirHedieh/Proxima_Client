import { NavigationActions } from './NavigationActions'

export const SceneParams = {
    SplashScreen: {
        name: 'HomePage',
        navigate: () => { NavigationActions.push(SceneParams.SplashScreen.name) }
    }
}
