/**
 * @format
 */
import * as React from 'react'
import { AppRegistry } from 'react-native'
import { App } from './src/App'
import { name as appName } from './app.json'

// safety for side-effects in notification in background mode
function HeadlessCheck({ isHeadless }) {
    if (isHeadless) {
        // App has been launched in the background by iOS, ignore
        return null
    }

    return <App />
}

AppRegistry.registerComponent(appName, () => HeadlessCheck)
