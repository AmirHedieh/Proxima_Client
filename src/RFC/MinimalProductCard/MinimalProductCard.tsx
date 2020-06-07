import * as React from 'react'
import { Image, View } from 'react-native'
import { BaseText } from '../../components/base_text/BaseText'
import { SafeTouch } from '../../components/safe_touch/SafeTouch'
import { Localization } from '../../text_process/Localization'
import { Styles } from './MinimalProductCardStyles'

interface IProductCardProps {
    image: string
    title: string
    price: number
    onPress: () => void
}

export const MinimalProductCard: React.FunctionComponent<IProductCardProps> = (props: IProductCardProps) => {
    return (
        <SafeTouch onPress={props.onPress} style={Styles.root}>
            <Image style={Styles.image} source={{ uri: props.image }} />
            <View style={Styles.bottomContainer}>
                <BaseText style={Styles.title} text={props.title} />
                <BaseText style={Styles.price} text={`${Localization.formatNumberToPrice(props.price)} تومان`} />
            </View>
        </SafeTouch>
    )
}
