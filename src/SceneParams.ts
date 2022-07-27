import { NavigationActions } from './NavigationActions'
import { ICommentsSceneProps } from './scenes/comments_scene/CommentsScene'
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
    },
    LookingStoreScene: {
        name: 'LookingStoreScene',
        navigate: () => {
            NavigationActions.push(SceneParams.LookingStoreScene.name)
        }
    },
    StoreInfoScene: {
        name: 'StoreInfoScene',
        navigate: () => {
            NavigationActions.push(SceneParams.StoreInfoScene.name)
        }
    },
    ProductScene: {
        name: 'ProductScene',
        navigate: () => {
            NavigationActions.push(SceneParams.ProductScene.name)
        }
    },
    CommentsScene: {
        name: 'CommentsScene',
        navigate: (params: ICommentsSceneProps) => {
            NavigationActions.push(SceneParams.CommentsScene.name, params)
        }
    },
}
