import * as React from 'react'
import {Text, View} from 'react-native'
import { EditText } from '../../../components/edit_text/EditText'
import { SafeTouch } from '../../../components/safe_touch/SafeTouch'
import { BaseScene } from '../BaseScene'

////////////////////////////////////////////////////////////////////////////////
// THIS PAGE IS ALL FOR TESTING SO NONE OF THE CONVENTIONS IS CONSIDERED HERE //
////////////////////////////////////////////////////////////////////////////////

// tslint:disable-next-line: no-empty-interface
interface IBaseTestProps {

}
interface IBaseTestState {
    num: number
}
export class BaseSceneTestPage extends BaseScene<IBaseTestProps, IBaseTestState> {
    public state = {
        num: 0
    }
    constructor(props) {
        super(props)
        this.doSth = this.doSth.bind(this)
    }
    protected sceneDidMount() {
        this.yesNoDialog.show({
            title: 'عنوان',
            // title: 'Title',
            // message: 'بله بله بله بله بله بله',
            message: 'این یک متن غیرواقعی برای تست این بخش از دیالوگ میباشد. \n برنامه اکنون در حالت راست به چپ است',
            // message: 'THIS IS YES NO DIALOG, Application is now in LTR state. This is a fake message.',
            noButtonText: 'خیر',
            yesButtonText: 'بله',
            // noButtonText: 'No',
            // yesButtonText: 'Yes',
            onYesButtonPressedCallback: () => this.yesNoDialog.hide(),
            onNoButtonPressedCallback: () => this.doSth()
        })
        // this.okDialog.show({
        //     title: 'عنوان',
        //     // title: 'Title',
        //     // message: 'بله بله بله بله بله بله',
        //     message: 'این یک متن غیرواقعی برای تست این بخش از دیالوگ میباشد. \n برنامه اکنون در حالت راست به چپ است',
        //     // message: 'THIS IS YES NO DIALOG, Application is now in LTR state. This is a fake message.',
        //     // buttonText: 'خیر',
        //     onButtonPress: () => this.okDialog.hide(),
        //     // onNoButtonPress: () => this.doSth()
        // })
    }
    protected renderSafe() {
        return (
            <View style={{ alignItems: 'center', justifyContent: 'center'}}>
                <Text>THIS IS MAIN CONTAINER OF PAGE</Text>
                <SafeTouch
                    onPress={this.doSth}
                >
                    <Text>{this.state.num}</Text>
                </SafeTouch>
                <EditText
                    style={{
                        borderWidth: 1,
                        // flex: 1 ,
                        height: 40
                    }}
                />
            </View>
        )
    }
    protected doSth() {
        this.setState({num: this.state.num + 1})
    }
    protected onBackPress() {
        this.setState({num: this.state.num + 1})
    }
}
