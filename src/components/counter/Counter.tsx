import * as React from 'react'
import { View } from 'react-native'
import { StyleType } from '../../Types'
import { BaseText } from '../base_text/BaseText'
import { Styles } from './CounterStyles'

interface ICounterProps {
    style?: StyleType,
    textStyle?: StyleType,
    onFinish: () => void
}
interface ICounterState {
    /** Seconds */
    time: number
}
export class Counter extends React.Component<ICounterProps, ICounterState> {
    public state = {
        time: 0
    }
    private intervalId = null

    public componentWillUnmount() {
        clearInterval(this.intervalId)
    }
    public render(): JSX.Element {
        const text = this.state.time !== 0 ? this.parseTimeToString() : '' // no text will be shown when time = 0
        return (
            <View style={this.props.style}>
                <BaseText
                    style={[this.props.textStyle, Styles.text]}
                    text={text}
                />
            </View>
        )
    }
    /**
     * set time and start counting down
     * @param time initial value for time. (Seconds)
     */
    public setTime(time: number): void {
        this.setState({time}, () => {
            this.intervalId = setInterval(this.elapse, 1000)
        })
    }
    public remainingTime(): number {
        return this.state.time
    }
    /**
     * Returns time string in 00:00 format
     */
    private parseTimeToString(): string {
        const minutes = Math.floor(this.state.time / 60)
        const seconds = (this.state.time - minutes * 60) % 60
        return `${(minutes < 10) ? `0${minutes}` : minutes}:${(seconds < 10) ? `0${seconds}` : seconds}`
    }
    private elapse = () => {
        this.setState({ time: --this.state.time })
        if (this.state.time <= 0) {
            clearInterval(this.intervalId)
            this.props.onFinish()
        }
    }
}
