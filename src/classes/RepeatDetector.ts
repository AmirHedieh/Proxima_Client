interface IRepeated {
    isRepeated: boolean
    repeatedValue: number
}

export class RepeatDetector {
    private data: number[] = []
    private nullDataCounter: number = 0
    private numberOfRepeats: number = 0

    public constructor(numberOfRepeats: number) {
        this.numberOfRepeats = numberOfRepeats
    }

    public setNumberOfRepeats(numberOfRepeats: number) {
        this.numberOfRepeats = numberOfRepeats
    }

    public reset(): void {
        this.data = []
        this.nullDataCounter = 0
    }

    public addToData(value: number) {
        if (value === null) {
            this.nullDataCounter++
            return
        }
        this.nullDataCounter = 0 // reset null count as a beacon was ranged
        if (this.data.length < this.numberOfRepeats) {
            this.data.unshift(value)
        } else {
            this.data.pop()
            this.data.unshift(value)
        }
    }

    public isDataRepeated(): IRepeated {
        if (this.nullDataCounter > 4 * this.numberOfRepeats) { // null repeated by multiple times of required repeat number
            return {
                isRepeated: true,
                repeatedValue: null
            }
        }
        if (this.data.length < this.numberOfRepeats) {
            return {
                isRepeated: false,
                repeatedValue: null
            }
        }
        // check if any inequality was found (if found => false)
        const isRepeated = !this.data.some((val, i, arr) => val !== arr[0])
        return {
            isRepeated,
            repeatedValue: isRepeated ? this.data[0] : null
        }
    }
}
