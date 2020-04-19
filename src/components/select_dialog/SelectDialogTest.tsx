import * as React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {SelectDialog} from './SelectDialog'

export class SelectDialogTest extends React.PureComponent {
    public state = {selectedItems: []}
    private child = null

    public render(): JSX.Element {
        return (
            <View>
                <TouchableOpacity onPress={this.showDialog}>
                    <Text>click me!</Text>
                </TouchableOpacity>
                <SelectDialog ref={(ref) => this.child = ref}/>
                {this.state.selectedItems}
            </View>
        )
    }

    private showDialog = () => {
        this.child.show(
            {
                items: [
                    {label: 'java', key: 'j'},
                    {label: 'javascript', key: 'js'},
                    {label: 'python', key: 'py'},
                    {label: 'C++', key: 'cpp'},
                    {label: 'Go', key: 'g'},
                    {label: 'C', key: 'c'}],
                title: 'favorite',
                description: 'what is your favorite programming language?',
                isMultiSelect: false,
                onItemsSelected: this.onItemsSelected
            }
        )
    }
    private onItemsSelected = (selectedItems) => {
        this.setState({selectedItems: selectedItems.map((item) => <Text key={item}>{item}</Text>)})
    }
}
