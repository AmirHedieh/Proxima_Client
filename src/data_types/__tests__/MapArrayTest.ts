import { MapArray } from '../MapArray'
const sortFunction = (a, b) => {
    return a.value > b.value ? 1 : -1
}
const keyExtractor = (a) => {
    return a.key
}
const ma = new MapArray({ sortFunction, keyExtractor })
ma.set({ value: 1, key: 1 })
ma.set({ value: 2, key: 2 })
ma.set({ value: 3, key: 3 })
ma.set({ value: 4, key: 4 })

describe('MapArray', () => {
    it('has', () => {
        expect(ma.has(3)).toEqual(true)
    })
    it('size', () => {
        expect(ma.size).toEqual(4)
    })
    it('removeByItem', () => {
        ma.removeByItem({ value: 1, key: 1 })
        expect(ma.size).toEqual(3)
    })
    it('removeByKey', () => {
        ma.removeByKey(2)
        expect(ma.size).toEqual(2)
    })
    it('get', () => {
        const item = ma.get(3)
        expect(item.value).toEqual(3)
    })
    it('getByIndex', () => {
        const item = ma.getByIndex(1)
        expect(item.value).toEqual(4)
    })
    it('set', () => {
        ma.set({ value: 5, key: 4 })
        const item = ma.getByIndex(1)
        expect(item.value).toEqual(5)
    })
})

const mapArray = new MapArray({ sortFunction, keyExtractor })
mapArray.set({ value: 1, key: 1 })
mapArray.set({ value: 2, key: 2 })
mapArray.set({ value: 3, key: 3 })
mapArray.set({ value: 4, key: 4 })
mapArray.set({ value: 5, key: 5 })
mapArray.set({ value: 6, key: 6 })

describe('Iterator', () => {
    it('for', () => {
        let expectedValue = 1
        for (const item of mapArray) {
            expect(item.value).toEqual(expectedValue)
            expectedValue++
        }
    })
})
