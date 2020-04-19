import * as React from 'react'
import { Text, View } from 'react-native'

export class App extends React.Component {
  public render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Welcome! This is TypeScript Template</Text>
      </View>
    )
  }
}
