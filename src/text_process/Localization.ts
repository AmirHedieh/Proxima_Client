import { GlobalState } from '../models/GlobalState'
import { ILanguageAndText } from '../models/LanguageAndText'
import { StatusCodes } from '../network/NetworkConstants'
import { En } from '../resources/localizations/en'
import { Fa } from '../resources/localizations/fa'
import { CommonValidator } from '../utils/Validator'

export class Localization {
    public static translate(key: string, args?: string[]): string {
        let output: string
        switch (GlobalState.getInstance().getLanguage()) {
            case 'en':
                output = En[key]
                break
            case 'fa':
                output = Fa[key]
                break
        }
        if (CommonValidator.isArray(args)) {
            for (let i = 0; i < args.length; i++) {
                output = output.replace(`$arg${i}`, args[i])
            }
        }
        return output
    }
    public static translateLanguageAndText(text: ILanguageAndText[]): string {
        let output: string = ''
        if (CommonValidator.isEmptyArray(text)) {
            return output
        }
        for (const textItem of text) {
            if (GlobalState.getInstance().getLanguage() === textItem.langId) {
                output = textItem.text
            }
        }
        return output
    }
    // TODO Define errors
    public static translateStatusCode(statusCode: number): string {
        switch (statusCode) {
            case StatusCodes.Http.bad_request:
            return Localization.translate('bad_request')
            case StatusCodes.Http.internal:
            return Localization.translate('internal')
            case StatusCodes.Http.unauthorized:
            return Localization.translate('unauthorized')
            case StatusCodes.Http.forbidden:
            return Localization.translate('forbidden')
            case StatusCodes.Http.not_found:
            return Localization.translate('not_found')
            case StatusCodes.Http.timeout:
            return Localization.translate('timeout')
            default:
            return Localization.translate('unknown_error')
        }
    }
    public static formatNumberToPrice(priceText: number): string {
        return priceText.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
}
