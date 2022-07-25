import * as React from 'react'
import { ImageBackground, Linking, ScrollView, View } from 'react-native'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import { BaseText } from '../../components/base_text/BaseText'
import { RoundButton } from '../../components/round_button/RoundButton'
import { RTLAwareView } from '../../components/rtl_aware/RTLAwareView'
import { SafeTouch } from '../../components/safe_touch/SafeTouch'
import { Colors, NetworkConfig } from '../../Constants'
import { Dimension, GlobalStyles } from '../../GlobalStyles'
import { IMuseum } from '../../models/Museum'
import { SceneParams } from '../../SceneParams'
import { Localization } from '../../text_process/Localization'
import { Styles } from './StoreInfoStyles'

const infoIconSize: number = 29 * Dimension.scaleX

interface IProps extends IMuseum {
}
export const StoreInfo: React.FunctionComponent<IProps> = (props: IProps): JSX.Element => {
    const onWebsitePress = () => {
        const url = `https://${props.website}`
        Linking.canOpenURL(url).then(supported => {
          if (supported) {
            Linking.openURL(url);
          } else {
            console.warn("Don't know how to open URI: " + url);
          }
        });
    }
    
    const onInstagramPress = () => {
        Linking.openURL(`instagram://user?username=${(props.instagram)}`)
        .catch(() => {
            Linking.openURL(`https://www.instagram.com/${(props.instagram)}`);
        })
    }
    
    const onTwitterPress = () => {
        Linking.openURL(`twitter://user?screen_name=${props.twitter}`)
        .catch(() => {
            Linking.openURL(`https://www.twitter.com/${props.twitter}`);
        })
    }

    return (
        <ScrollView contentContainerStyle={Styles.centerScrollViewContainer}>
            <BaseText style={Styles.name} text={props.name} />

            <View style={Styles.mediumSpacer} />

            <ImageBackground
                style={Styles.image}
                source={{ uri: NetworkConfig.localServerPictureBaseUrl + props.picture }}
            >
                {props.picture ? null : <View style={GlobalStyles.spacer}/>}
                {props.picture ? null : <BaseText style={Styles.noImageText} text={Localization.translate('noPictureStoreInfoScene')}/>}
            </ImageBackground>

            <View style={Styles.largeSpacer} />

            <View style={Styles.rowCenterView}>
                <MaterialIcon name='home' size={infoIconSize} />
                <View style={GlobalStyles.spacer} />
                <BaseText text={props.name} />
            </View>

            <View style={Styles.smallSpacer} />

            <View style={Styles.rowCenterView}>
                <MaterialIcon name='phone' size={infoIconSize} />
                <View style={GlobalStyles.spacer} />
                <BaseText style={Styles.phoneNumber} text={props.phoneNumber} />
            </View>

            <View style={Styles.mediumSpacer} />

            <View style={Styles.informationContainer}>
                <RTLAwareView>
                    <BaseText style={Styles.infoTitle} text={Localization.translate('informationStoreInfoScene')} />
                    <View style={GlobalStyles.spacer}/>
                </RTLAwareView>
                <BaseText style={Styles.info} text={props.information} />
            </View>

            <View style={Styles.mediumSpacer} />

            {props.website && (
                <SafeTouch onPress={onWebsitePress} style={Styles.rowCenterView}>
                    <FontAwesomeIcon name='globe' size={infoIconSize} />
                    <View style={GlobalStyles.spacer} />
                    <BaseText style={Styles.contactText} text={props.website} />
                </SafeTouch>
            )}

            <View style={Styles.smallSpacer} />

            {props.instagram && (
                <SafeTouch onPress={onInstagramPress} style={Styles.rowCenterView}>
                    <FontAwesomeIcon name='instagram' size={infoIconSize} />
                    <View style={GlobalStyles.spacer} />
                    <BaseText style={Styles.contactText} text={`@${props.instagram}`} />
                </SafeTouch>
            )}

            <View style={Styles.smallSpacer} />

            {props.twitter && (
                <SafeTouch onPress={onTwitterPress} style={Styles.rowCenterView}>
                    <FontAwesome5 name='twitter' size={infoIconSize} />
                    <View style={GlobalStyles.spacer} />
                    <BaseText style={Styles.contactText} text={`@${props.twitter}`} />
                </SafeTouch>
            )}
        </ScrollView>
    )
}
