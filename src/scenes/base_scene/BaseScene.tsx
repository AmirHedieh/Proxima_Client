import * as React from 'react'
import { BackHandler, Keyboard, StatusBar, View } from 'react-native'
import { CustomDialog } from '../../components/custom_dialog/CustomDialog'
import { LoadingDialog } from '../../components/loading_dialog/LoadingDialog'
import { OkDialog } from '../../components/ok_dialog/OkDialog'
import { PasswordDialog } from '../../components/passwordDialog/PasswordDialog'
import { ScrollSelectDialog } from '../../components/scroll_select_dialog/ScrollSelectDialog'
import { SelectDialog } from '../../components/select_dialog/SelectDialog'
import { YesNoDialog } from '../../components/yes_no_dialog/YesNoDialog'
import { EnvironmentVariables } from '../../Constants'
import { NavigationActions } from '../../NavigationActions'
import { SceneParams } from '../../SceneParams'
import { Logger } from '../../utils/Logger'
import { Styles } from './BaseSceneStyles'

// tslint:disable-next-line: no-empty-interface
export interface IBaseSceneProps {}
// tslint:disable-next-line: no-empty-interface
export interface IBaseSceneState {}

export abstract class BaseScene<
    PassedProps extends IBaseSceneProps,
    PassedState extends IBaseSceneState
> extends React.Component<PassedProps, PassedState> {
    protected static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    }

    protected okDialog: OkDialog
    protected yesNoDialog: YesNoDialog
    protected selectDialog: SelectDialog
    protected scrollSelectDialog: ScrollSelectDialog
    protected loadingDialog: LoadingDialog
    protected passwordDialog: PasswordDialog
    protected customDialog: CustomDialog
    protected dismissKeyboardOnMount = true
    protected hideStatusBarAndroid = false
    protected hideStatusBarIOS = false
    protected isSceneMounted = false
    private isBackButtonPressValid = true
    private touchTimeout: any = null

    public constructor(props: PassedProps) {
        super(props)
        this.onBackPress = this.onBackPress.bind(this)
        this.handleBackPress = this.handleBackPress.bind(this)
    }

    public componentDidMount(): void {
        if (this.dismissKeyboardOnMount) {
            Keyboard.dismiss()
        }
        if (!EnvironmentVariables.isIos && !this.isSceneMounted) {
            BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
        }
        this.isSceneMounted = true
        this.sceneDidMount()
    }
    public componentWillUnmount(): void {
        this.clearTimeoutIfExists()
        if (!EnvironmentVariables.isIos && this.isSceneMounted) {
            BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
        }
        this.isSceneMounted = false
        this.sceneWillUnmount()
    }
    public componentDidCatch(error: any): void {
        if (EnvironmentVariables.isDev) {
            Logger.error(error)
            NavigationActions.reset(SceneParams.SplashScreen.name)
        }
    }
    public render(): JSX.Element {
        return (
            <View style={Styles.root}>
                {this.renderDialogs()}
                {this.renderStatusBar()}
                {this.renderSafe()}
            </View>
        )
    }

    /**
     * Puts JSX ELement into BaseScene render method to be rendered.
     * BaseScene render function has mutiple parts, for childs extending BaseScene it provides
     * renderSafe to put their own elements into BaseScene render function.
     * @returns JSX.ELement, Elements to be put in render
     */
    protected abstract renderSafe(): JSX.Element
    /**
     * Overrides android back button functionality
     * @returns void
     */
    protected abstract onBackPress(): void
    protected sceneDidMount(): void {}
    protected sceneWillUnmount(): void {}
    /**
     * Validates back button press and calls @function onBackPress
     * if its valid
     * @returns Boolean to override default android back button press listener
     */
    protected handleBackPress() {
        if (this.validateBackPress()) {
            this.onBackPress()
        }
        return true
    }

    private renderStatusBar() {
        if (EnvironmentVariables.isIos) {
            // IOS OS
            return <StatusBar hidden={this.hideStatusBarIOS} />
        } else {
            // Android OS
            return <StatusBar hidden={this.hideStatusBarAndroid} />
        }
    }
    private renderDialogs(): JSX.Element {
        return (
            <>
                <OkDialog ref={(ref: OkDialog) => (this.okDialog = ref)} />
                <YesNoDialog ref={(ref: YesNoDialog) => (this.yesNoDialog = ref)} />
                <SelectDialog ref={(ref: SelectDialog) => (this.selectDialog = ref)} />
                <ScrollSelectDialog ref={(ref: ScrollSelectDialog) => (this.scrollSelectDialog = ref)} />
                <LoadingDialog ref={(ref: LoadingDialog) => (this.loadingDialog = ref)} />
                <PasswordDialog ref={(ref: PasswordDialog) => (this.passwordDialog = ref)} />
                <CustomDialog ref={(ref) => (this.customDialog = ref)} />
            </>
        )
    }
    private validateBackPress() {
        if (this.isBackButtonPressValid === false) {
            return false
        }
        this.isBackButtonPressValid = false
        this.clearTimeoutIfExists()
        this.touchTimeout = setTimeout(() => {
            this.isBackButtonPressValid = true
        }, 300)
        return true
    }
    private clearTimeoutIfExists(): void {
        if (this.touchTimeout != null) {
            clearTimeout(this.touchTimeout)
            this.touchTimeout = null
        }
    }
}
