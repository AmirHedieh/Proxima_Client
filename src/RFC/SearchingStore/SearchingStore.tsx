import * as React from 'react'
import { Image, View } from 'react-native'
import { BaseText } from '../../components/base_text/BaseText'
import { Styles } from './SearchingStoreStyles'

import { Localization } from '../../text_process/Localization'

const storeImage = require('../../resources/images/store.png')

export const SearchingStore: React.FunctionComponent = () => {
    return (
        <View style={Styles.root}>
            <View style={Styles.container}>
                <Image style={Styles.image} source={storeImage} />
            </View>
            <View style={Styles.mediumSpacer} />
            <BaseText style={Styles.title} text={Localization.translate('searchingTitleStoreInfoScene')} />
        </View>
    )
}
