import NetInfo, { NetInfoState } from '@react-native-community/netinfo'
interface INetManager {
    isConnected: () => void
    isInternetAvailable: () => void
    onConnectionStateChange: () => void
}
export class NetManager implements INetManager {
    public onConnectionStateChange: () => void = null
    public init(): void {
        NetInfo.addEventListener(this.onNetStateChange)
    }
    private onNetStateChange = (state: NetInfoState) => {
        console.log('Connection type', state.type)
    }
}
