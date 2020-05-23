import { Dimensions, Platform } from 'react-native'

const window = Dimensions.get('window')

export const EnvironmentVariables = {
    isDev: __DEV__,
    isTest: false,
    isIos: Platform.OS === 'ios',
    isIPhoneX: window.width === 812 || window.height === 812 || window.width === 896 || window.height === 896,
    defaultDbName: '@mivanet_storage',
    isFakeDataMode: true,
    version: '1.0.0'
}

export const Colors = {
    red: '#f00',
    green: '#0f0',
    blue: '#00f',
    black: '#000',
    lightGray: '#ddd',
    mediumGray: '#7d7d7d',
    heavyGray: '#616161',
    cardGray: '#f5f5f5',
    milky: '#fafafa',
    dialogOverlay: '#0000008C',
    pink: '#FF1744',
    greenDark: '#388E3C',
    milky: '#FAFAFA',
    pureWhite: '#ffffff',
    grayContent: '#424242',
    yellowLight: '#f2dc83'
}

export const NetworkConfig = {
    apiBaseUrl: 'http://192.168.1.9:3000/',
    maxRetry: 3,
    httpRequestTimeout: 5000,
    maxConcurrentConnections: 1,
    localServerPictureBaseUrl: 'http://185.8.173.206:80/picture'
}
