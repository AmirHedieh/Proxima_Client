import ConnectivityManager from 'react-native-connectivity-status'

export interface ILocationManager {
    subscribe: () => void
    unSubscribe: () => void
    isLocationEnabled: () => Promise<boolean>
    onLocationStatusChange: (isEnabled: boolean) => void
}

export class LocationManager implements ILocationManager {
    public onLocationStatusChange: (isEnabled: boolean) => void = null
    private connectivityStatusSubscription = null

    public async subscribe(): Promise<void> {
        this.connectivityStatusSubscription = ConnectivityManager.addStatusListener(({ eventType, status }) => {
            if (eventType === 'location') {
                if (this.onLocationStatusChange) {
                    this.onLocationStatusChange(status)
                }
            }
        })
        if (this.onLocationStatusChange) {
            // execute listener on subscribe
            this.onLocationStatusChange(await ConnectivityManager.areLocationServicesEnabled())
        }
    }

    public isLocationEnabled() {
        return ConnectivityManager.areLocationServicesEnabled()
    }

    public unSubscribe(): void {
        this.connectivityStatusSubscription.remove()
    }
}
