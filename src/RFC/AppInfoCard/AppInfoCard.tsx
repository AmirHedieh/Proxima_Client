import * as React from 'react'
import { View } from 'react-native'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { BaseText } from '../../components/base_text/BaseText'
import { RTLAwareView } from '../../components/rtl_aware/RTLAwareView'
import { Colors } from '../../Constants'
import { Dimension } from '../../GlobalStyles'
import { Localization } from '../../text_process/Localization'
import { Styles } from './AppInfoCardStyles'

export const AppInfoCard: React.FunctionComponent = () => {
    return (
        <View style={Styles.root}>
            <MaterialIcon name='weekend' size={58 * Dimension.scaleX} color={Colors.primaryMedium} />
            <View style={Styles.largeSpacer} />
            <BaseText text={Localization.translate('wannaGetThisApplicationAppInfoCard')} />
            <View style={Styles.mediumSpacer} />
            <RTLAwareView style={Styles.rowContainer}>
                <BaseText text={`${Localization.translate('phoneNumberAppInfoCard')} : 021-5058086`} />
                <View style={{ width: Styles.smallSpacer.height }} />
                <MaterialIcon name='phone' size={24} />
            </RTLAwareView>
            <RTLAwareView style={Styles.rowContainer}>
                <BaseText text={`${Localization.translate('mobileNumberAppInfoCard')} : 09905226632`} />
                <View style={{ width: Styles.smallSpacer.height }} />
                <MaterialIcon name='phone' size={24} />
            </RTLAwareView>
            <View style={Styles.largeSpacer} />
            <BaseText text={Localization.translate('whyThisApplicationAppInfoCard')} />
            <View style={Styles.smallSpacer} />
            <BaseText
                style={{ textAlign: 'center' }}
                text={
                    'بهترین و راحت ترین راه ممکن برای معرفی محصولات مغازه. به صورت کاملا فیزیکی و عملی.  با محصول ما فروش خود را چند برابر کنید'
                }
            />
        </View>
    )
}
