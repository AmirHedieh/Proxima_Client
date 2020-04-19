import RNFetchBlob from 'react-native-fetch-blob'
import * as Mime from 'react-native-mime-types'
import { EnvironmentVariables } from '../Constants'

export interface IRNFetchBlobStat {
    filename: string,
    path: string,
    size: number,
    type: 'file' | 'directory',
    lastModified: number,
    pureFileName: string,
    fileType: string
}

export class FileHelper {
    public static getFileStats(path: string): Promise<{err: any, stats: IRNFetchBlobStat}> {
        if (EnvironmentVariables.isIos === false && path.startsWith('file://') === false) {
            path = 'file://'.concat(path)
        }
        return new Promise((resolve: ({err, stats: IRNFetchBlobStat}) => void) => {
            RNFetchBlob.fs.stat(path).then((stats) => {
                resolve({err: null, stats: {
                        ...stats,
                        pureFileName : stats.filename.replace(/^.*[\\\/]/, ''),
                        fileType: stats.filename.substring(
                            stats.filename.lastIndexOf('.'),
                            stats.filename.length
                        )
                    }})
            }).catch((err) => {
                resolve({err, stats: null})
            })
        })
    }
    public static isImage(mediaFormat: string): boolean {
        return mediaFormat === '.png' || mediaFormat === '.jpg'
    }
    public static isVideo(mediaFormat: string): boolean {
        return mediaFormat === '.mp4' || mediaFormat === '.wav'
    }
    public static isUnSupportedFormat(mediaFormat): boolean {
        if (this.isImage(mediaFormat)) {
            return false
        }
        if (this.isVideo(mediaFormat)) {
            return false
        }
        return true
    }
    public static getMimeType(extension: string): string {
        return Mime.lookup(extension)
    }
    public static generateDirectory = (isImage: boolean): string => {
        return (isImage || EnvironmentVariables.isIos === false)
            ? RNFetchBlob.fs.dirs.CacheDir
            : RNFetchBlob.fs.dirs.DocumentDir
    }
    public static getImagePickerFileAddress = (path: string): string => {
        return (EnvironmentVariables.isIos)
            ? path.replace('file://', '')
            : path
    }
    public static getFileFormatFromUrl = (url: string): string => {
        const slicedString = url.split('.')
        if (slicedString.length < 1) {
            return ''
        }
        const format = slicedString.pop()
        return `.${format}`
    }
    public static isFileExists = async (path: string): Promise<boolean> => {
        return RNFetchBlob.fs.exists(path)
    }
}
