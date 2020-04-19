import { EnvironmentVariables } from '../Constants'

export class Logger {
    public static log(value: any) {
        if (EnvironmentVariables.isDev) {
        // tslint:disable-next-line:no-console
        console.log(value)
        }
    }
    public static warn(value: string) {
        if (EnvironmentVariables.isDev) {
        // tslint:disable-next-line:no-console
        console.warn(value)
        }
    }
    public static error(value: string) {
        if (EnvironmentVariables.isDev) {
        // tslint:disable-next-line:no-console
        console.error(value)
        }
    }
}
