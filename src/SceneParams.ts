import { NavigationActions } from './NavigationActions'

export const SceneParams = {
    SplashScreen: {
        name: 'SplashScreen',
        navigate: () => {
            NavigationActions.push(SceneParams.SplashScreen.name)
        }
    },
    HomeScene: {
        name: 'HomeScene',
        navigate: () => {
            NavigationActions.push(SceneParams.SplashScreen.name)
        }
    },
    MinimalProductScene: {
        name: 'MinimalProductScene',
        navigate: (params: { productId: number }) => {
            NavigationActions.push(SceneParams.MinimalProductScene.name, params)
        }
    }
}
