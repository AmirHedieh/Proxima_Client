import { AsyncStorage } from 'react-native'
import firebase from 'react-native-firebase'
import { OkDialog } from '../components/ok_dialog/OkDialog'
import { HttpManager } from '../network/HttpManager'
import { Localization } from '../text_process/Localization'
import { Logger } from './Logger'

export class NotificationHelper {
    public static setNotification(okDialogRef: OkDialog) {
        this.okDialogRef = okDialogRef
        this.checkPermission()
        this.createNotificationListeners()
        this.subscribeToTopics(['all'])
    }

    public static async subscribeToTopics(topics: string[]) {
        for (const topic of topics) {
            await firebase.messaging().subscribeToTopic(topic)
        }
    }
    public static async unsubscribeToTopics(topics: string[]) {
        for (const topic of topics) {
            await firebase.messaging().unsubscribeFromTopic(topic)
        }
    }
    private static okDialogRef: OkDialog
    private static async createNotificationListeners() {
        // Triggered when a particular notification has been received in foreground
        firebase.notifications().onNotification((notification) => {
            const { title, body, data } = notification
            this.showNotification(title, body, parseInt(data.notification, 10))
        })
        // If your app is in background, you can listen for when a notification is clicked
        firebase.notifications().onNotificationOpened((notification) => {
            const { title, body, data } = notification.notification
            this.showNotification(title, body, parseInt(data.notification, 10))
        })

        // If your app is closed, you can check if it was opened by a notification being clicked
        const notificationOpen = await firebase.notifications().getInitialNotification()
        if (notificationOpen) {
            const { title, body } = notificationOpen.notification.data
            this.showNotification(title, body, parseInt(notificationOpen.notification.data.notification, 10))
        }
    }

    private static async checkPermission() {
        const enabled = await firebase.messaging().hasPermission()
        if (enabled) {
            this.getToken()
        } else {
            this.requestPermission()
        }
    }

    private static async showNotification(title: string, body: string, id: number) {
        // mark notification as read in back
        const response = await HttpManager.getInstance().getNotification({
            notification: id
        })
        if (!response.isSuccessful()) {
            this.okDialogRef.show({
                title: Localization.translate('error'),
                message: response.getData()
            })
            return
        }

        this.okDialogRef.show({
            title,
            message: body
        })
    }

    private static async getToken() {
        const firebaseToken = await firebase.messaging().getToken()
        const savedToken = await AsyncStorage.getItem('fcmToken')
        if (!savedToken || savedToken !== firebaseToken) {
            const response = await HttpManager.getInstance().updateNotificationToken({
                notification_token: firebaseToken
            })
            if (!response.isSuccessful()) {
                Logger.log(`could not update token\n ${response.getMessage()}`)
                return
            }
            await AsyncStorage.setItem('fcmToken', firebaseToken)
        }
    }

    private static async requestPermission() {
        try {
            await firebase.messaging().requestPermission()
            this.getToken()
        } catch (error) {
            console.log('permission rejected')
        }
    }
}
