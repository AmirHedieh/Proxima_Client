export interface IRawStore {
    name: string
    info: string
}
export class Store {
    public name: string
    public info: string
    public constructor(rawStore: IRawStore) {
        this.name = rawStore.name
        this.info = rawStore.info
    }
}
