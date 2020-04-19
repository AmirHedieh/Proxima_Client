export class Timer {
    private intervalId: number = null
    private handler: () => void = null
    private time: number = null
    public constructor(handler: () => void, time: number) {
        this.handler = handler
        this.time = time
    }
    public start() {
        if (!this.intervalId) {
            this.stop()
            this.intervalId = setInterval(this.handler, this.time)
        }
    }
    public stop() {
        if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
        }
    }
    public reset(time: number) {
        this.time = time
        this.stop()
        this.start()
    }
}
