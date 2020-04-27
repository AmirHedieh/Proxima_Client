export class RepeatDetector {
    private data: number[] = []
    private numberOfRepeats: number = 0

    public constructor(numberOfRepeats: number) {
        this.numberOfRepeats = numberOfRepeats
    }
    public setNumberOfRepeats(numberOfRepeats: number) {
        this.numberOfRepeats = numberOfRepeats
    }
    public addToData(value: number) {
        if (this.data.length < this.numberOfRepeats) {
            this.data.unshift(value)
        } else {
            this.data.pop()
            this.data.unshift(value)
        }
    }

    public isDataRepeated(): boolean {
        if (this.data.length < this.numberOfRepeats) {
            return false
        }
        return !this.data.some((val, i, arr) => val !== arr[0]) // check if any inequality was found (if found => false)
    }
}
