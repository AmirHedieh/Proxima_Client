import NetInfo, { NetInfoState } from '@react-native-community/netinfo'
export interface INetManager {
    subscribe: () => void
    unSubscribe: () => void
    onConnectionStateChange: (isConnected: boolean) => void
}
export class NetManager implements INetManager {
    public onConnectionStateChange: (isConnected: boolean) => void = null
    private unSubscriber: () => void = null

    public subscribe(): void {
        // net info runs listener once automatically thats why listener is not called manually here
        this.unSubscriber = NetInfo.addEventListener(this.onNetStateChange)
    }

    public unSubscribe() {
        if (this.unSubscriber) {
            this.unSubscriber()
        }
    }

    private onNetStateChange = (state: NetInfoState) => {
        if (this.onConnectionStateChange) {
            this.onConnectionStateChange(state.isConnected)
        }
    }
}
