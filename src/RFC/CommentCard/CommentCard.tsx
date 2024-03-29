import * as React from 'react'
import { ScrollView, View } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { BaseText } from '../../components/base_text/BaseText'
import { RTLAwareView } from '../../components/rtl_aware/RTLAwareView'
import { SafeTouch } from '../../components/safe_touch/SafeTouch'
import { Dimension, GlobalStyles } from '../../GlobalStyles'
import { Styles } from './CommentCardStyles'

interface IProductCardProps {
    commentor: string
    text: string
}

export const CommentCard: React.FunctionComponent<IProductCardProps> = (props: IProductCardProps): JSX.Element => {
        return (
            <View style={Styles.root}>
                <RTLAwareView style={Styles.topContainer}>
                    <BaseText style={Styles.commentor} text={props.commentor}/>
                    <View style={GlobalStyles.spacer}/>
                </RTLAwareView>
                <RTLAwareView  style={Styles.bottomContainer}>
                    <ScrollView nestedScrollEnabled={true}>
                        <BaseText style={Styles.text} text={props.text}/>
                    </ScrollView>
                </RTLAwareView>
            </View>
        )
}
