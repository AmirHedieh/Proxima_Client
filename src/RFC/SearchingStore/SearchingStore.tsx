import * as React from 'react'
import { Image, View } from 'react-native'
import { BaseText } from '../../components/base_text/BaseText'
import { Styles } from './SearchingStoreStyles'

import { StaticImages } from '../../StaticImages'
import { Localization } from '../../text_process/Localization'

export const SearchingStore: React.FunctionComponent = () => {
    return (
        <View style={Styles.root}>
            <View style={Styles.container}>
                <Image style={Styles.image} source={StaticImages.store} />
            </View>
            <View style={Styles.mediumSpacer} />
            <BaseText style={Styles.title} text={Localization.translate('searchingTitleStoreInfoScene')} />
        </View>
    )
}
