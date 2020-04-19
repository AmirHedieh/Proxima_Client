import { Localization } from '../../text_process/Localization'
import { ISelectDialogItem } from '../select_dialog/SelectDialog'

export class ScrollSelectDialogListCreator {
    public static dateList(): ISelectDialogItem[][] {
        const items: ISelectDialogItem[][] = []
        let item: ISelectDialogItem[] = []
        for (let i = 1398; i < 1405; i++) {
            item.push({ key: String(i), label: String(i) })
        }

        items.push(item)

        item = []
        for (let i = 1; i <= 12; i++) {
            item.push({ key: String(i), label: Localization.translate('month' + i) })
        }
        items.push(item)

        item = []
        for (let i = 1; i <= 31; i++) {
            item.push({ key: String(i), label: String(i) })
        }
        items.push(item)

        return items
    }
    public static dayHandler = (
        selectedIndex: number[], items: ISelectDialogItem[][], changedColumn: number, selectedValue: number
    ) => {
        if (changedColumn === 1) {
            items[2] = []
            if (selectedValue < 6) {
                for (let i = 1; i <= 31; i++) {
                    items[2].push({ key: String(i), label: String(i) })
                }
            } else if (selectedValue < 11) {
                for (let i = 1; i <= 30; i++) {
                    items[2].push({ key: String(i), label: String(i) })
                }
                if (selectedIndex[2] === 30) {
                    selectedIndex[2] = 29 // start from zero
                }
            } else if (selectedValue === 11) {
                for (let i = 1; i <= 29; i++) {
                    items[2].push({ key: String(i), label: String(i) })
                }
                if (selectedIndex[2] > 28) {
                    selectedIndex[2] = 28
                }
            }
        }
    }
}
