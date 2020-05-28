export interface IRawStore {
    store: number
    picture: string
    name: string
    phone_number: string
    whatsapp: string
    instagram: string
    telegram: string
    info: string
    address: string
}

export interface IStore {
    id: number
    picture: string
    storeName: string
    phoneNumber: string
    whatsapp: string
    instagram: string
    telegram: string
    info: string
    address: string
}
export class Store implements IStore {
    public id: number
    public picture: string
    public storeName: string
    public phoneNumber: string
    public whatsapp: string
    public instagram: string
    public telegram: string
    public info: string
    public address: string
    public constructor(rawStore: IRawStore) {
        this.id = rawStore.store
        this.picture = rawStore.picture
        this.storeName = rawStore.name
        this.phoneNumber = rawStore.phone_number
        this.whatsapp = rawStore.whatsapp
        this.instagram = rawStore.instagram
        this.telegram = rawStore.telegram
        this.info = rawStore.info
        this.address = rawStore.address
    }
}
