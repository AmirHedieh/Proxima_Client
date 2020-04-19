import RNFetchBlob from 'react-native-fetch-blob'
import { EnvironmentVariables } from '../Constants'
import { HttpManager } from '../network/HttpManager'
import { StatusCodes, TimeoutTime, TokenHeader } from '../network/NetworkConstants'
import { FileHelper } from './FileHelper'
import { Logger } from './Logger'
import { CommonValidator } from './Validator'
const shorthash = require('shorthash')

type onBinaryDataLoadComplete = (source: any) => void
export type onBinaryDataLoadProgress = (current: number, total: number) => void

export interface IQueue {
    requestId: string,
    url: string,
    isImage: boolean,
    onLoadComplete: onBinaryDataLoadComplete,
    onProgress?: onBinaryDataLoadProgress,
    retryCount: number
}

export class CacheHandler {
    public static getInstance(): CacheHandler {
        if (CacheHandler.instance == null) {
            CacheHandler.instance = new CacheHandler()
        }
        return CacheHandler.instance
    }
    private static instance: CacheHandler = null
    private maximumRetry = 10
    private fileCacheMap: Map<string, boolean> = new Map()
    private requestQueue: IQueue[] = []
    public cancelRequest = (requestId: string): void => {
        for (let i = 0; i < this.requestQueue.length; i++) {
            if (this.requestQueue[i].requestId === requestId) {
                this.requestQueue.splice(i, 1)
                return
            }
        }
    }
    public async invalidateCache(url: string, isImage: boolean) {
        const URLSymbol = shorthash.unique(url)
        if (this.fileCacheMap.has(URLSymbol) === true) {
            this.fileCacheMap.delete(URLSymbol)
        }
        const path = this.generatePath(URLSymbol, isImage)
        await RNFetchBlob.fs.unlink(path)
    }
    public generatePath(URLSymbol: string, isImage: boolean) {
        return `${FileHelper.generateDirectory(isImage)}/${URLSymbol}${isImage ? '.png' : '.mp4'}`
    }
    public generateSource(path: string): any {
        return {
            uri: (EnvironmentVariables.isIos ? '' : 'file://').concat(path)
        }
    }
    public requestBinary = (
        requestId: string,
        url: string,
        isImage: boolean,
        onLoadComplete: onBinaryDataLoadComplete,
        onProgress?: onBinaryDataLoadProgress
    ): void => {
        requestAnimationFrame(() => {
            if (CommonValidator.isNullOrEmpty(url) === true) {
                onLoadComplete(null)
                return
            }
            const URLSymbol = shorthash.unique(url)
            if (this.fileCacheMap.has(URLSymbol)) {
                onLoadComplete(this.generateSource(this.generatePath(URLSymbol, isImage)))
                return
            }
            this.requestQueue.push({
                requestId,
                url,
                isImage,
                onLoadComplete,
                onProgress,
                retryCount: this.maximumRetry
            })
            if (this.requestQueue.length === 1) {
                this.readOrDownload()
            }
        })
    }
    private onProcessComplete = (path: string, status: number, currentRequest: IQueue) => {
        if (path != null && status === StatusCodes.Http.ok) {
            currentRequest.onLoadComplete(this.generateSource(path))
        }
        if (path == null && status !== StatusCodes.Http.not_found && status !== StatusCodes.Http.unauthorized) {
            currentRequest.retryCount++
            if (currentRequest.retryCount < this.maximumRetry) {
                this.requestQueue.push(currentRequest)
            }
        }
        if (this.requestQueue.length > 0) {
            this.readOrDownload()
        }
    }
    private async readOrDownload() {
        const currentRequest = this.requestQueue.splice(0, 1)[0]
        try {
            const URLSymbol = shorthash.unique(currentRequest.url)
            const path = this.generatePath(URLSymbol, currentRequest.isImage)
            if (this.fileCacheMap.has(URLSymbol) === true) {
                this.onProcessComplete(path, StatusCodes.Http.ok, currentRequest)
                return
            }
            const exist = await RNFetchBlob.fs.exists(path)
            if (exist === true) {
                this.fileCacheMap.set(URLSymbol, true)
                this.onProcessComplete(path, StatusCodes.Http.ok, currentRequest)
                return
            }
            const headers = {}
            headers[TokenHeader] = HttpManager.getInstance().getSession()
            if (currentRequest.isImage === false) {
                headers['Content-Type'] = 'multipart/form-data'
            }
            RNFetchBlob
            .config({
                fileCache: true,
                overwrite: true,
                timeout: TimeoutTime,
                path
            })
            .fetch('GET', currentRequest.url, headers)
            .progress(currentRequest.onProgress != null ? currentRequest.onProgress : null)
            .then((response) => {
                const status = response.respInfo != null ? response.respInfo.status : StatusCodes.Http.timeout
                if (response.data == null || status !== StatusCodes.Http.ok) {
                    this.fileCacheMap.set(URLSymbol, false)
                    this.onProcessComplete(null, status, currentRequest)
                    return
                }
                this.fileCacheMap.set(URLSymbol, true)
                this.onProcessComplete(path, status, currentRequest)
            })
            .catch((err) => {
                Logger.warn(err)
                this.fileCacheMap.set(URLSymbol, false)
                this.onProcessComplete(null, StatusCodes.Http.internal, currentRequest)
            })
        } catch (err) {
            Logger.warn(err)
            this.onProcessComplete(null, StatusCodes.Http.internal, currentRequest)
        }
    }
}
