const LottieView = require('lottie-react-native')
import * as React from 'react'
import { View } from 'react-native'
import { Styles } from './SearchingStoreStyles'
import { BaseText } from '../../components/base_text/BaseText'

import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
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
{
    /* <View style={Styles.searchingBottomTab}>
    <MaterialIcon name={'directions-walk'} size={30} />
    <BaseText
        style={Styles.searchingBottomTabTitle}
        text={Localization.translate('goToStoreBottomTabStoreInfoScene')}
    />
</View> */
}
