import * as React from 'react'
import { Image, View } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { BaseText } from '../../components/base_text/BaseText'
import { StaticImages } from '../../StaticImages'
import { Localization } from '../../text_process/Localization'
import { Styles } from './SearchingStoreStyles'

export class SearchingStore extends React.Component {
    public render() {
        return (
            <View style={Styles.root}>
                <Animatable.View
                    style={Styles.container}
                    animation='pulse'
                    duration={3500}
                    iterationCount={'infinite'}
                    useNativeDriver={true}
                >
                    <Image style={Styles.image} source={StaticImages.store} />
                </Animatable.View>
                <View style={Styles.mediumSpacer} />
                <BaseText style={Styles.title} text={Localization.translate('searchingTitleStoreInfoScene')} />
            </View>
        )
    }
}
