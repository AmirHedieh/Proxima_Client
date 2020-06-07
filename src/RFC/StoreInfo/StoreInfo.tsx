import * as React from 'react'
import { Image, ScrollView, View } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { BaseText } from '../../components/base_text/BaseText'
import { NetworkConfig } from '../../Constants'
import { Dimension, GlobalStyles } from '../../GlobalStyles'
import { IStore } from '../../models/Store'
import { Styles } from './StoreInfoStyles'

const infoIconSize: number = 29 * Dimension.scaleX

export const StoreInfo: React.FunctionComponent<IStore> = (props: IStore): JSX.Element => {
    return (
        <ScrollView contentContainerStyle={Styles.centerScrollViewContainer}>
            <BaseText style={Styles.name} text={props.storeName} />

            <View style={Styles.mediumSpacer} />

            <Image style={Styles.image} source={{ uri: NetworkConfig.localServerPictureBaseUrl + props.picture }} />

            <View style={Styles.largeSpacer} />

            <View style={Styles.rowCenterView}>
                <MaterialIcon name='home' size={infoIconSize} />
                <View style={GlobalStyles.spacer} />
                <BaseText text={props.address} />
            </View>

            <View style={Styles.smallSpacer} />

            <View style={Styles.rowCenterView}>
                <MaterialIcon name='phone' size={infoIconSize} />
                <View style={GlobalStyles.spacer} />
                <BaseText style={Styles.phoneNumber} text={props.phoneNumber} />
            </View>

            <View style={Styles.mediumSpacer} />

            <BaseText style={Styles.info} text={props.info} />

            <View style={Styles.mediumSpacer} />

            {props.whatsapp && (
                <View style={Styles.rowCenterView}>
                    <FontAwesomeIcon name='whatsapp' size={infoIconSize} />
                    <View style={GlobalStyles.spacer} />
                    <BaseText style={Styles.contactText} text={props.whatsapp} />
                </View>
            )}

            <View style={Styles.smallSpacer} />

            {props.instagram && (
                <View style={Styles.rowCenterView}>
                    <FontAwesomeIcon name='instagram' size={infoIconSize} />
                    <View style={GlobalStyles.spacer} />
                    <BaseText style={Styles.contactText} text={props.instagram} />
                </View>
            )}

            <View style={Styles.smallSpacer} />

            {props.telegram && (
                <View style={Styles.rowCenterView}>
                    <FontAwesome5 name='telegram-plane' size={infoIconSize} />
                    <View style={GlobalStyles.spacer} />
                    <BaseText style={Styles.contactText} text={props.telegram} />
                </View>
            )}
        </ScrollView>
    )
}
