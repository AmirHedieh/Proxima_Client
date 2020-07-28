import { RandomGenerator } from './RandomGenerator'

export class ListenerManager {
    public static manager: ListenerManager = null

    public static getInstance(): ListenerManager {
        if (this.manager == null) {
            this.manager = new ListenerManager()
        }
        return this.manager
    }

    private listeners: Map<string, Map<string, () => void>> = null

    private constructor() {
        this.listeners = new Map<string, Map<string, () => void>>()
    }

    /** add a global listener to an event, returns an unSubscriber function */
    public addListener(event: string, callback: () => void): () => void {
        const stringId: string = RandomGenerator.generateObjectId()
        if (this.listeners.has(event)) {
            this.listeners.get(event).set(stringId, callback)
        } else {
            this.listeners.set(event, new Map<string, () => void>().set(stringId, callback))
        }
        return () => this.listeners.get(event).delete(stringId)
    }

    public emitEvent(event: string) {
        this.listeners.get(event).forEach((callback) => {
            if (callback) {
                callback()
            }
        })
    }
}

export const EVENTS = {
    SplashProcessFinish: 'SplashProcessFinish'
}
