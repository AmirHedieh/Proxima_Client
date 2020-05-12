import { AppEngine } from '../classes/AppEngine'
import { DomainViewModel } from '../classes/DomainViewModel'
import { UiStore } from './UiStore'
import { UiViewModel } from './UiViewModel'

const domainModel = new AppEngine()
const uiModel = new UiStore()
export const stores = {
    AppState: new DomainViewModel(domainModel),
    UIState: new UiViewModel(uiModel)
}
