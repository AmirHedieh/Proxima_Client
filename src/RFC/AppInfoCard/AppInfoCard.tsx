import * as React from 'react'
import { View } from 'react-native'
import { Styles } from './AppInfoCardStyles'

interface IProductCardProps {
    image: string
    title: string
    price: number
    onPress: () => void
}

export const MinimalProductCard: React.FunctionComponent<IProductCardProps> = (props: IProductCardProps) => {
    return <View style={}></View>
}
