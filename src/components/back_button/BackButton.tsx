import * as React from 'react'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { Colors } from '../../Constants'
import { StyleType } from '../../Types'
import { SafeTouch } from '../safe_touch/SafeTouch'
import { Styles } from './BackButtonStyles'

interface IBackButtonProps {
    onPress: () => void
    style?: StyleType
}

export const BackButton: React.FunctionComponent<IBackButtonProps> = (props: IBackButtonProps) => {
    return (
        <SafeTouch style={[Styles.root, props.style]} onPress={props.onPress}>
            <MaterialIcon name='arrow-back' size={24} color={Colors.black} />
        </SafeTouch>
    )
}
