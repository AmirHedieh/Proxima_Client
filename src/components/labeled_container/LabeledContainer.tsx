import * as React from 'react'
import { View } from 'react-native'
import { StyleType } from '../../Types'
import { BaseText } from '../base_text/BaseText'
import { RTLAwareView } from '../rtl_aware/RTLAwareView'
import { Styles } from './LabeledContainerStyles'

export interface ILabeledContainer {
    labelText: string,
    errorText?: string,
    style?: StyleType
    innerContainerStyle?: StyleType,
}
export class LabeledContainer extends React.PureComponent<ILabeledContainer> {
    public static defaultProps: ILabeledContainer = {
        labelText: '',
        errorText: '',
        style: null,
        innerContainerStyle: null
    }
    public render(): JSX.Element {
        return (
            <View style={Styles.mainContainer}>
                <View style={this.props.style}>
                    {this.props.labelText != null &&
                        <RTLAwareView>
                            <BaseText
                                style={Styles.labelStyle}
                                text={this.props.labelText}
                            />
                        </RTLAwareView>
                    }
                    <View
                        style={[Styles.innerContainerStyle, this.props.innerContainerStyle]}
                    >
                        {this.props.children}
                    </View>
                    {this.props.errorText != null &&
                        <RTLAwareView
                            reverseJustifyContent={true}
                        >
                            {/* <RTLAwareView style={{flex: 1}} reverseJustifyContent={true}> */}
                                <BaseText
                                    style={Styles.errorStyle}
                                    text={this.props.errorText}
                                />
                            {/* </RTLAwareView> */}
                        </RTLAwareView>
                    }
                </View>
            </View>
        )
    }
}
