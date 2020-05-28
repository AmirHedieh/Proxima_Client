import { NavigationActions } from './NavigationActions'
import { IMinimalProductSceneProps } from './scenes/minimal_product_scene/MinimalProductScene'

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
        navigate: (params: IMinimalProductSceneProps) => {
            NavigationActions.push(SceneParams.MinimalProductScene.name, params)
        }
    }
}
