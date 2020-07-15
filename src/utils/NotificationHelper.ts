import messaging from '@react-native-firebase/messaging'
import { AsyncStorage } from 'react-native'
import { OkDialog } from '../components/ok_dialog/OkDialog'

// TODO: to show image in IOS, some actions must be done
export class NotificationHelper {
    public static setNotification(okDialogRef: OkDialog) {
        this.okDialogRef = okDialogRef
        this.checkPermission()
        this.createNotificationListeners()
        // this.subscribeToTopics(['all'])
    }

    public static async subscribeToTopics(topics: string[]) {
        for (const topic of topics) {
            await messaging().subscribeToTopic(topic)
        }
    }
    public static async unsubscribeToTopics(topics: string[]) {
        for (const topic of topics) {
            await messaging().unsubscribeFromTopic(topic)
        }
    }
    private static okDialogRef: OkDialog
    private static async createNotificationListeners() {
        // Triggered when a particular notification has been received in foreground
        messaging().onMessage((remoteMessage) => {
            console.log('on message', remoteMessage)
            const { title, body } = remoteMessage.notification
            const imageUrl = remoteMessage.data.imageUrl
            this.showNotification(title, body, imageUrl)
        })
        // If your app is in background, you can listen for when a notification is clicked
        messaging().onNotificationOpenedApp((remoteMessage) => {
            console.log('on notif opened', remoteMessage)
            const { title, body } = remoteMessage.notification
            const imageUrl = remoteMessage.data.imageUrl
            this.showNotification(title, body, imageUrl)
        })

        // If your app is closed, you can check if it was opened by a notification being clicked
        const initialRemoteMessage = await messaging().getInitialNotification()
        if (initialRemoteMessage) {
            console.log('initial remote', initialRemoteMessage)
            const { title, body } = initialRemoteMessage.notification
            const imageUrl = initialRemoteMessage.data.imageUrl
            this.showNotification(title, body, imageUrl)
        }
    }

    private static async checkPermission() {
        const enabled = await messaging().hasPermission()
        if (enabled) {
            this.getToken()
        } else {
            this.requestPermission()
        }
    }

    private static async showNotification(title: string, body: string, imageUrl: string) {
        this.okDialogRef.show({
            title,
            message: body,
            imageUrl
        })
    }

    private static async getToken() {
        const firebaseToken = await messaging().getToken()
        const savedToken = await AsyncStorage.getItem('fcmToken')
        if (!savedToken || savedToken !== firebaseToken) {
            // const response = await HttpManager.getInstance().updateNotificationToken({
            //     notification_token: firebaseToken
            // })
            // if (!response.isSuccessful()) {
            //     Logger.log(`could not update token\n ${response.getMessage()}`)
            //     return
            // }
            // await AsyncStorage.setItem('fcmToken', firebaseToken)
        }
    }

    private static async requestPermission() {
        try {
            await messaging().requestPermission()
            this.getToken()
        } catch (error) {
            console.log('permission rejected')
        }
    }
}
