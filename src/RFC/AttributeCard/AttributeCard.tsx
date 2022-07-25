import * as React from 'react'
import { Image, ScrollView, View } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { BaseText } from '../../components/base_text/BaseText'
import { RTLAwareView } from '../../components/rtl_aware/RTLAwareView'
import { Styles } from './AttributeCardStyles'

interface IProductCardProps {
    title: string
    description: string
}

export const AttributeCard: React.FunctionComponent<IProductCardProps> = (props: IProductCardProps): JSX.Element => {
        return (
            <RTLAwareView>
                <View style={Styles.columnLine} />
                <View style={Styles.mediumHorizontalSpacer} />
                <View>
                    <RTLAwareView>
                        <BaseText
                            style={Styles.title}
                            text={props.title}
                        />
                    </RTLAwareView>
                    <RTLAwareView>
                        <BaseText style={Styles.description} text={props.description} />
                    </RTLAwareView>
                </View>
            </RTLAwareView>
        )
}
