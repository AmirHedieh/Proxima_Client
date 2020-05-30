export interface IRawStore {
    id: number
    picture: string
    name: string
    phoneNumber: string
    whatsappContact: string
    instagramContact: string
    telegramContact: string
    information: string
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
        this.id = rawStore.id
        this.picture = rawStore.picture
        this.storeName = rawStore.name
        this.phoneNumber = rawStore.phoneNumber
        this.whatsapp = rawStore.whatsappContact
        this.instagram = rawStore.instagramContact
        this.telegram = rawStore.telegramContact
        this.info = rawStore.information
        this.address = rawStore.address
    }
}
