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
    // primary colors
    red: '#f00',
    green: '#0f0',
    blue: '#00f',
    black: '#000',
    lightGray: '#ddd',
    mediumGray: '#7d7d7d',
    heavyGray: '#616161',
    cardGray: '#f5f5f5',
    liteGray: '#9e9e9e',
    // component colors
    backgroundColor: '#fafafa',
    dialogOverlay: '#0000008C',
    dashedButtonBorderColor: '#c2c2c2',
    textGreenColor: '#388e3c',
    disabledColor: '#7d7d7d60',
    // LoginRegister scenes Colors
    pink: '#FF1744',
    pinkLight: '#FE7F9C',
    greenDark: '#388E3C',
    liteGreenDark: '#81c784',
    greenLight: '#8BC34A',
    white: '#FAFAFA',
    pureWhite: '#ffffff',
    grayContent: '#424242',
    gold: '#ffc829',
    // search scene
    yellow: '#fff826',
    lightGreen: '#72ff68',
    lightRed: '#ff4a6d',
    // product scene
    darkBlack: '#212121',
    yellowLight: '#f2dc83',
    purple: '#aa00ff',
    purpleLight: '#ea80fc',
    orange: '#ffab00',
    orangeLight: '#ffe57f',
    darkGreen: '#00c853',
    darkGreenLight: '#b9f6ca',
    darkRed: '#dd2c00',
    darkRedLight: '#ff9e80',
    green2: '#64dd17',
    green2Light: '#ccff90',
    yellow2: '#ffd600',
    yellow2Light: '#ffff8d',
    orange2: '#ffff8d',
    pink2: '#ff80ab',
    blue2: '#1976d2',
    red2: '#fa4a6d'
}

export const NetworkConfig = {
    apiBaseUrl: 'http://192.168.1.9:3000/',
    maxRetry: 3,
    httpRequestTimeout: 5000,
    maxConcurrentConnections: 1,
    localServerPictureBaseUrl: 'http://185.8.173.206:80/picture'
}
