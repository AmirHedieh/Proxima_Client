import * as React from 'react'
import { Text, View } from 'react-native'
import { RandomGenerator } from '../../utils/RandomGenerator'

export class FakeScene extends React.Component {
    public render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 50 }}>{RandomGenerator.generateRandomNumber(100, 1000)}</Text>
            </View>
        )
    }
}
