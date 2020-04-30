export type LocalizationLanguages = 'en' | 'fa'

export type StyleType = any

export interface ISource {
    uri: string
}

export interface INavigation {
    setParams: (arg: any) => void
    state: {
        params: any
        routeName: string
    }
    addListener: (event: string, callback: () => void) => INavigationAddListenerResult
}

export interface INavigationAddListenerResult {
    remove: () => void
}

export type LocalImage = number | { uri: string }

export type LanguageKeyType = 'fa' | 'tr' | 'en'

export type DetectionState = 'NO_STORE_NO_BEACON' | 'FOUND_STORE_NO_BEACON' | 'FOUND_STORE_FOUND_BEACON'
