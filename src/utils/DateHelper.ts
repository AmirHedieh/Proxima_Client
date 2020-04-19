
import * as Moment from 'jalali-moment'
import { Localization } from '../text_process/Localization'
import { LanguageKeyType } from '../Types'
import { CommonValidator } from './Validator'

interface IDayHourMin {
    day: number
    hour: number
    minute: number
}

export class DateHelper {
    public static addDays(date: Date, days: number): Date {
        const result = new Date(date)
        result.setDate(result.getDate() + days)
        return result
    }
    public static addHours(date: Date, hour: number): Date {
        const result = new Date(date)
        result.setTime(result.getTime() + (hour * 60 * 60 * 1000))
        return result
    }
    public static calculateDifferenceDay(oldDate: Date, newDate: Date): number {
        return Math.round((newDate.getTime() - oldDate.getTime()) / (1000 * 3600 * 24))
    }
    public static calculateDifferenceHour(oldDate: Date, newDate: Date): number {
        return Math.round(((newDate.getTime() - oldDate.getTime()) % 86400000 / 3600000))
    }
    public static calculateDifferenceMin(oldDate: Date, newDate: Date): number {
        return Math.round((((newDate.getTime() - oldDate.getTime()) % 86400000) % 3600000) / 60000)
    }
    public static calculateDifferenceText(oldDate: Date, newDate: Date): string {
        const day = this.calculateDifferenceDay(oldDate, newDate)
        const hour = this.calculateDifferenceHour(oldDate, newDate)
        const min = this.calculateDifferenceMin(oldDate, newDate)
        let result = ''
        if (day !== 0) {
            result += day + ' ' + Localization.translate('day')
        }
        if (hour !== 0 && hour !== 24) {
            if (result !== '') {
                result += ' ' + Localization.translate('and') + ' '
            }
            result += hour + ' ' + Localization.translate('hour')
        }
        if (day === 0 && min !== 60) {
            if (result !== '') {
                result += ' ' + Localization.translate('and') + ' '
            }
            result += min + ' ' + Localization.translate('minute')
        }
        return result
    }
    /**
     * returns date difference in an object with properties of day,hour,minute
     * returns 0,0,0 if input date is from current time
     */
    public static timestampLeftToDayHourMin(date: number): IDayHourMin {
        if (date < new Date().getTime()) {
            return {
                day: 0,
                hour: 0,
                minute: 0
            }
        }
        const distanceSec = (date - (new Date()).getTime()) / 1000
        const day = Math.floor(distanceSec / (60 * 60 * 24))
        const hour = Math.floor((distanceSec - day * 60 * 60 * 24) / (60 * 60))
        const minute = Math.floor((distanceSec - (day * 60 * 60 * 24 + hour * 60 * 60)) / 60)
        return {
            day,
            hour,
            minute
        }
    }
    public static dateToJalaliString(gregorianDate: Date, format = DateHelper.defaultFormat): string {
        return Moment(gregorianDate).locale('fa').format(format)
    }
    // return with month name
    public static dateToJalaliStringPersian(gregorianDate: Date, format = DateHelper.defaultFormat): string {
        const stringDate = Moment(gregorianDate).locale('fa').format(format).split('-')
        stringDate[1] = this.getMonths()[parseInt(stringDate[1], 10) - 1]

        return stringDate[2] + ' ' + stringDate[1] + ' ' + stringDate[0]
    }
    public static gregorianStringToDate(gregorianString: string, format = DateHelper.defaultFormat): Date {
        return Moment.from(gregorianString, 'en', format).toDate()
    }
    public static jalaliStringToDate(jalaliString: string, format = DateHelper.defaultFormat): Date {
        return Moment.from(jalaliString, 'fa', format).toDate()
    }
    public static dateToGregorianString(gregorianDate: Date, format = DateHelper.defaultFormat): string {
        return Moment(gregorianDate).locale('en').format(format)
    }
    public static isoToDate(isoString: string): Date {
        if (CommonValidator.isNullOrEmpty(isoString)) {
            return null
        }
        return new Date(isoString)
    }
    public static parseMsToString(
        millieSecond: number,
        language: LanguageKeyType,
        format = DateHelper.defaultFormat
    ): string {
        return this.parseDateToString(new Date(millieSecond), language, format)
    }
    public static generateDateFormatBasedOnLanguage(
        language: LanguageKeyType
    ): string {
        switch (language) {
            case 'fa':
                return 'YYYY/MM/DD'
            case 'tr':
            case 'en':
            default:
                return 'DD/MM/YYYY'
        }
    }
    public static parseDateToString(
        gregorianDate: Date,
        language: LanguageKeyType,
        format = DateHelper.defaultFormat
    ): string {
        if (gregorianDate == null) {
            return 'unknown'
        }
        switch (language) {
            case 'fa':
                return this.dateToJalaliString(gregorianDate, format)
            case 'tr':
            case 'en':
            default:
                return this.dateToGregorianString(gregorianDate, format)
        }
    }
    public static getMonths(): string[] {
        const months: string[] = []
        for (let i = 1; i < 13; i++) {
            months.push(Localization.translate('month' + i))
        }
        return months
    }
    public static parseStringToDate(s: string): Date {
        return new Date(s)
    }
    private static defaultFormat = 'YYYY-MM-DD HH:mm:ss'// DO not change default format
}
