import { LocalizationLanguages } from '../Types'
import { Logger } from '../utils/Logger'

interface IGlobalState {
  language: LocalizationLanguages
  isRtl: boolean
}

export class GlobalState {
  public static getInstance(): GlobalState {
    if (GlobalState.instance == null) {
      GlobalState.instance = new GlobalState()
    }
    return GlobalState.instance
  }
  private static instance: GlobalState = null
  private state: IGlobalState = this.restoreDefaultState()
  // Getters
  public getLanguage = (): LocalizationLanguages => {
    return this.state.language
  }
  public getIsRtl = (): boolean => {
    return this.state.isRtl
  }
  public getVersion = (): string => {
    return '0.7.0'
  }

  // Setters
  public setLanguage = (language: LocalizationLanguages): void => {
    this.state.language = language
    switch (this.state.language) {
      case 'en':
        this.state.isRtl = false
        break
      case 'fa':
        this.state.isRtl = true
        break
      default:
        Logger.error('Unsupported language detected:' + this.state.language)
    }
  }

  private restoreDefaultState(): IGlobalState {
    return (
      {
        isRtl: true,
        language: 'fa'
      }
    )
  }
}
