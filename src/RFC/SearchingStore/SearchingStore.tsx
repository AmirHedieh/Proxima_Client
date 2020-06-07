const LottieView = require('lottie-react-native')
import * as React from 'react'
import { View } from 'react-native'
import { BaseText } from '../../components/base_text/BaseText'
import { Styles } from './SearchingStoreStyles'

import { Localization } from '../../text_process/Localization'

const ScanAnimation = require('resources/animations/1115-ripple.json')

export const SearchingStore: React.FunctionComponent = () => {
    return (
        <View style={Styles.root}>
            <View style={Styles.animationContainer}>
                <LottieView
                    style={Styles.animation}
                    source={ScanAnimation}
                    autoPlay={true}
                    loop={true}
                    hardwareAccelerationAndroid={true}
                    resizeMode={'contain'}
                />
            </View>
            <View style={Styles.mediumSpacer} />
            <BaseText style={Styles.title} text={Localization.translate('searchingTitleStoreInfoScene')} />
        </View>
    )
}
