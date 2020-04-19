import * as React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {LoadingDialog} from './LoadingDialog'

export class LoadingDialogTest extends React.PureComponent {
    private child = null
    public render(): JSX.Element {
        return (
            <View>
                <TouchableOpacity onPress={this.show}>
                    <Text>click me!</Text>
                </TouchableOpacity>
                <LoadingDialog ref={(ref) => this.child = ref}/>
            </View>
        )
    }
    private show = () => {
        this.child.show()
    }
}
