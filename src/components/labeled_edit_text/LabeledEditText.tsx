import * as React from 'react'
import { StyleType } from '../../Types'
import { EditText, IEditTextProps } from '../edit_text/EditText'
import { ILabeledContainer, LabeledContainer } from '../labeled_container/LabeledContainer'
import { Styles } from './LabeledEditTextStyles'

interface ILabeledEditTextProps extends IEditTextProps, ILabeledContainer {
    editTextStyle?: StyleType
}
export class LabeledEditText extends React.PureComponent<ILabeledEditTextProps> {
    private refEditText: EditText = null
    public render(): JSX.Element {
        return (
                <LabeledContainer
                    labelText={this.props.labelText}
                    errorText={this.props.errorText}
                    style={this.props.style}
                    innerContainerStyle={this.props.innerContainerStyle}
                >
                    <EditText
                        ref={(ref) => this.refEditText = ref}
                        style={[Styles.editText, this.props.editTextStyle]}
                        placeHolder={this.props.placeHolder}
                        onChangeText={this.props.onChangeText}
                        keyboardType={this.props.keyboardType}
                        secureTextEntry={this.props.secureTextEntry}
                        maxLength={this.props.maxLength}
                        multiline={this.props.multiline}
                        onFocus={this.props.onFocus}
                        onBlur={this.props.onBlur}
                        selectTextOnFocus={this.props.selectTextOnFocus}
                        initialText={this.props.initialText}
                    />
                </LabeledContainer>
        )
    }
    public getEditTextRef(): EditText {
        return this.refEditText
    }
}
