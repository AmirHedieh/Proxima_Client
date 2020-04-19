import { CommonValidator } from '../utils/Validator'

export interface IRawLanguageAndText {
    lang_id: string,
    text: string
}
export interface ILanguageAndText {
    langId: string,
    text: string
}
export class LanguageAndText {
    public static generate(rawData: IRawLanguageAndText[]): ILanguageAndText[] {
        const arr = []
        if (CommonValidator.isEmptyArray(rawData) === false) {
            for (const element of rawData) {
                arr.push({
                    langId: CommonValidator.isNullOrEmpty(element.lang_id)
                        ? null
                        : element.lang_id
                    ,
                    text: CommonValidator.isNullOrEmpty(element.text)
                        ? null
                        : element.text
                })
            }
        }
        return arr
    }
}
