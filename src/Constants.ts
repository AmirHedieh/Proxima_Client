import { Dimensions, Platform } from 'react-native'

const window = Dimensions.get('window')

export const EnvironmentVariables = {
    isDev: __DEV__,
    isTest: false,
    isIos: Platform.OS === 'ios',
    isIPhoneX: window.width === 812 || window.height === 812 || window.width === 896 || window.height === 896,
    defaultDbName: '@mivanet_storage',
    isFakeDataMode: true,
    version: '1.0'
}

export const Colors = {
    red: '#f00',
    green: '#0f0',
    blue: '#00f',
    blueDark: '#00008b',
    black: '#000',
    lightGray: '#ddd',
    mediumGray: '#7d7d7d',
    heavyGray: '#616161',
    cardGray: '#f5f5f5',
    milky: '#fafafa',
    dialogOverlay: '#0000008C',
    pink: '#FF1744',
    greenDark: '#388E3C',
    pureWhite: '#ffffff',
    grayContent: '#424242',
    yellow: '#FFD700',
    yellowLight: '#f2dc83',
    // primary
    creamLight: '#ffead9',
    creamMedium: '#FFCDA3',
    creamMedium2: '#df9659',
    creamMedium3: '#ffb87d',
    creamDark: '#B2855E',
    // secondary
    primaryLight: '#3C4159',
    primaryMedium: '#1A2440',
    primaryDark: '#091126',
    greenSuccess: '#388E3C',
    blueInfo: '#1976D2',
    redWarn: '#F44336'
}

export const NetworkConfig = {
    // server ip: 194.5.205.176:4000
    // server picture ip: 194.5.205.176:80/pictures
    apiBaseUrl: 'http://192.168.1.4:8000/api/v1/',
    httpAPIBaseUrl: 'http://192.168.1.4:8000/api/v1/',
    maxRetry: 3,
    httpRequestTimeout: 5000,
    maxConcurrentConnections: 1,
    localServerPictureBaseUrl: 'http://192.168.1.4:8000/storage/'
}