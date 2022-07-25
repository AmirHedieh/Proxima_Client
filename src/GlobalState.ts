
interface IGlobalState {
  museum_id: number,
  token: string
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
  public getMuseumId = (): number => {
    return this.state.museum_id
  }
  public getToken = (): string => {
    return this.state.token
  }

  // Setters
  public setMuseumId(id: number): void {
    this.state.museum_id = id
  }
  public setToken(token: string): void {
    this.state.token = token
  }

  private restoreDefaultState(): IGlobalState {
    return (
      {
        museum_id: null,
        token: null
      }
    )
  }
}
