import * as React from 'react'
import { Image, View } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { BaseText } from '../../components/base_text/BaseText'
import { RTLAwareView } from '../../components/rtl_aware/RTLAwareView'
import { Dimension } from '../../GlobalStyles'
import { StaticImages } from '../../StaticImages'
import { Localization } from '../../text_process/Localization'
import { Styles } from './AppInfoCardStyles'
import { Colors } from '../../Constants'

export const AppInfoCard: React.FunctionComponent = () => {
    return (
        <View style={Styles.root}>
            <View style={Styles.logoImageContainer}>
                <Image resizeMode={'contain'} style={Styles.logoImage} source={StaticImages.logoTransparent} />
            </View>
            <View style={Styles.mediumSpacer} />
            <BaseText style={Styles.wannaAppText} text={Localization.translate('wannaGetThisApplicationAppInfoCard')} />
            <View style={Styles.mediumSpacer} />
            <RTLAwareView style={Styles.rowContainer}>
                <BaseText
                    style={Styles.phoneText}
                    text={`${Localization.translate('phoneNumberAppInfoCard')} : 021-5058086`}
                />
                <View style={{ width: 16 * Dimension.scaleX }} />
                <MaterialIcon name='phone' size={24 * Dimension.scaleX} color={Colors.primaryMedium} />
            </RTLAwareView>
            <RTLAwareView style={Styles.rowContainer}>
                <BaseText
                    style={Styles.phoneText}
                    text={`${Localization.translate('mobileNumberAppInfoCard')} : 09905226632`}
                />
                <View style={{ width: 16 * Dimension.scaleX }} />
                <MaterialIcon name='phone' size={24 * Dimension.scaleX} color={Colors.primaryMedium} />
            </RTLAwareView>
            <View style={Styles.largeSpacer} />
            <View style={{ flexDirection: 'row' }}>
                <MaterialIcon name={'star'} size={24 * Dimension.scaleX} color={Colors.primaryMedium} />
                <MaterialIcon name={'star'} size={24 * Dimension.scaleX} color={Colors.primaryMedium} />
                <MaterialIcon name={'star'} size={24 * Dimension.scaleX} color={Colors.primaryMedium} />
                <MaterialIcon name={'star'} size={24 * Dimension.scaleX} color={Colors.primaryMedium} />
                <MaterialIcon name={'star'} size={24 * Dimension.scaleX} color={Colors.primaryMedium} />
            </View>
            <View style={Styles.largeSpacer} />
            <BaseText style={Styles.whyAppText} text={Localization.translate('whyThisApplicationAppInfoCard')} />
            <View style={Styles.smallSpacer} />
            <BaseText
                style={Styles.infoText}
                text={
                    'بهترین و راحت ترین راه ممکن برای معرفی محصولات مغازه. به صورت کاملا فیزیکی و عملی.  با محصول ما فروش خود را چند برابر کنید'
                }
            />
        </View>
    )
}
