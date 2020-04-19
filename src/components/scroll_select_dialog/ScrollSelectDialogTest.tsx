import * as React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { ScrollSelectDialog } from './ScrollSelectDialog'
import { ScrollSelectDialogListCreator } from './ScrollSelectDialogListCreator'

export class ScrollSelectDialogTest extends React.PureComponent {
    public state = { selectedItems: [] }
    private child = null

    public render(): JSX.Element {
        return (
            <View>
                <TouchableOpacity onPress={this.showDialog}>
                    <Text>click me!</Text>
                </TouchableOpacity>
                <ScrollSelectDialog
                    ref={(ref) => this.child = ref}
                />
                {this.state.selectedItems}
            </View>
        )
    }

    private showDialog = () => {
        this.child.show(
            {
                items: ScrollSelectDialogListCreator.dateList(),
                title: 'favorite',
                onItemScroll: ScrollSelectDialogListCreator.dayHandler,
                onOkButtonPressedCallback: this.onItemsSelected
            }
        )
    }
    private onItemsSelected = (selectedIndex: number[]) => {
        console.warn(selectedIndex)
    }
}
