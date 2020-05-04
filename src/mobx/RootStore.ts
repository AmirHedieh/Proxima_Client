import { ViewModel } from '../classes/ViewModel'
import { AppEngine } from '../classes/AppEngine'
import { UiStore } from './UiStore'
import { UiViewModel } from './UiViewModel'

const domainModel = new AppEngine()
const uiModel = new UiStore()
export const stores = {
    AppState: new ViewModel(domainModel),
    UIState: new UiViewModel(uiModel)
}
