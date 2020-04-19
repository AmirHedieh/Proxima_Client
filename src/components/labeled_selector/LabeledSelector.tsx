import * as React from 'react'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { Colors } from '../../Constants'
import { Dimension, GlobalStyles } from '../../GlobalStyles'
import { BaseText } from '../base_text/BaseText'
import { ILabeledContainer, LabeledContainer } from '../labeled_container/LabeledContainer'
import { RTLAwareView } from '../rtl_aware/RTLAwareView'
import { SafeTouch } from '../safe_touch/SafeTouch'
import { Styles } from './LabeledSelectorStyles'

interface ILabeledSelectorProps extends ILabeledContainer {
    text?: string,
    onIconPress?: () => void,
    icon?: string,
}
export class LabeledSelector extends React.PureComponent<ILabeledSelectorProps> {
    public static defaultProps: ILabeledSelectorProps = {
        labelText: '',
        text: '',
        icon: 'angle-down',
        errorText: '',
        onIconPress: () => {}
    }
    public render(): JSX.Element {
        return (
            <SafeTouch
                onPress={this.props.onIconPress}
                style={GlobalStyles.safeTouch}
            >
                <LabeledContainer
                    labelText={this.props.labelText}
                    errorText={this.props.errorText}
                    style={[{width: Dimension.fullSizeMenuItemWidth}, this.props.style]}
                    innerContainerStyle={[Styles.innerContainer, this.props.innerContainerStyle]}
                >
                    <RTLAwareView>
                        <BaseText
                            style={Styles.labeledContainerText}
                            text={this.props.text}
                        />
                        <View style={GlobalStyles.spacer}/>
                        {
                            <Icon
                                name={this.props.icon}
                                color={Colors.heavyGray}
                                size={32 * Dimension.scaleX}
                            />
                        }
                    </RTLAwareView>
                </LabeledContainer>
            </SafeTouch>
        )
    }
}
