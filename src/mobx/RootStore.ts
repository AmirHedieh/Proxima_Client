import { AppEngine } from '../classes/AppEngine'
import { DomainViewModel } from '../classes/DomainViewModel'
import { ConnectionStore } from './connection_store/ConnectionStore'
import { ConnectionViewModel } from './connection_store/ConnectionViewModel'
import { UiStore } from './UiStore'
import { UiViewModel } from './UiViewModel'

const domainModel = new AppEngine()
const uiModel = new UiStore()
const connectionStore = new ConnectionStore()

export const stores = {
    AppState: new DomainViewModel(domainModel),
    UIState: new UiViewModel(uiModel),
    ConnectionStore: new ConnectionViewModel(connectionStore)
}
