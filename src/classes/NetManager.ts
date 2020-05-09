import NetInfo, { NetInfoState } from '@react-native-community/netinfo'
interface INetManager {
    onConnectionStateChange: (isConnected: boolean) => void
}
export class NetManager implements INetManager {
    public onConnectionStateChange: (isConnected: boolean) => void = null

    public init(): void {
        NetInfo.addEventListener(this.onNetStateChange)
    }

    private onNetStateChange = (state: NetInfoState) => {
        if (this.onConnectionStateChange) {
            this.onConnectionStateChange(state.isConnected)
        }
    }
}
