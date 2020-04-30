import { ViewModel } from '../classes/ViewModel'
import { AppEngine } from '../classes/AppEngine'

const model = new AppEngine()
export const stores = {
    AppState: new ViewModel(model)
}
