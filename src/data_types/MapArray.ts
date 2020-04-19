import { Logger } from '../utils/Logger'
import { CommonValidator } from '../utils/Validator'

type SortFunction<T> = (a: T, b: T) => -1 | 1
type KeyExtractor<T> = (item: T) => number

/**
 * This data type is a combination of map and array for a efficient data type
 */
export class MapArray<T> implements Iterable<T> {
    private map: Map<number, T> = new Map()
    private list: T[] = []
    private sortFunction: SortFunction<T> = null
    private keyExtractor: KeyExtractor<T> = null
    private shouldBeSorted: boolean = true
    public constructor(params: { sortFunction?: SortFunction<T>, keyExtractor: KeyExtractor<T> }) {
        if (params.sortFunction !== null) {
            this.shouldBeSorted = true
        }
        this.sortFunction = params.sortFunction
        this.keyExtractor = params.keyExtractor
    }
    public removeByKey = (key: number): void => {
        if (this.map.has(key) === false) {
            return
        }
        if (CommonValidator.isEmptyArray(this.list)) {
            Logger.error('unexpected state of empty list even when the key exists in the map')
            return
        }
        this.map.delete(key)
        for (let i = 0; i < this.list.length; i++) {
            if (this.keyExtractor(this.list[i]) === key) {
                this.list.splice(i, 1)
                return
            }
        }
    }
    public removeByItem = (item: T): void => {
        return this.removeByKey(this.keyExtractor(item))
    }
    public get size(): number {
        return this.list.length
    }
    public has = (key: number): boolean => {
        return this.map.has(key)
    }
    public get = (key: number): T => {
        return this.map.get(key)
    }
    public getByIndex = (index: number): T => {
        return this.list[index]
    }
    public set = (item: T): void => {
        const key = this.keyExtractor(item)
        if (this.map.has(key)) {
            if (CommonValidator.isEmptyArray(this.list) === true) {
                Logger.error('list and map are async')
                return
            }
            for (let i = 0; i < this.list.length; i++) {
                if (this.keyExtractor(this.list[i]) === key) {
                    this.list[i] = item
                    this.map.set(key, item)
                    return
                }
            }
        }
        let isPlaced = false
        if (this.shouldBeSorted && CommonValidator.isEmptyArray(this.list) === false) {
            for (let i = 0; i < this.list.length; i++) {
                if (this.sortFunction(item, this.list[i]) === -1) {
                    this.list.splice(i, 0, item)
                    this.map.set(key, item)
                    isPlaced = true
                    break
                }
            }
        }
        if (isPlaced === false) {
            this.list.push(item)
            this.map.set(key, item)
        }
    }
    // Please do not modify array
    public getAsList = (): readonly T[] => {
        return this.list
    }
    public [Symbol.iterator]() {
        let pointer = 0
        const list = this.list
        return {
            next(): IteratorResult<T> {
                if (pointer < list.length) {
                    return {
                        done: false,
                        value: list[pointer++]
                    }
                } else {
                    return {
                        done: true,
                        value: null
                    }
                }
            }
        }
    }
}
