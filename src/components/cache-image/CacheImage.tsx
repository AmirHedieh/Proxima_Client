import * as React from 'react'
import {ActivityIndicator, Image, InteractionManager} from 'react-native'
import {ISource, StyleType} from '../../Types'
import {CacheHandler, onBinaryDataLoadProgress} from '../../utils/CacheHandler'
import {RandomGenerator} from '../../utils/RandomGenerator'
import {CommonValidator} from '../../utils/Validator'
import {Styles} from './CacheImageStyles'

interface ICacheImageProps {
    url: string
    onProgressChanged?: onBinaryDataLoadProgress
    style?: StyleType
    defaultSource?: ISource,
    isCover?: boolean
}

interface ICacheImageState {
    URLCacheSource: ISource
}

export class CacheImage extends React.Component<ICacheImageProps, ICacheImageState> {
    public static defaultProps = {
        url: null,
        onProgressChanged: () => {},
        defaultSource: null,
        style: null,
        isCover: false
    }
    public state = {
        URLCacheSource: null
    }
    private isSceneMounted: boolean = false
    private retryCount: number = 0
    private lastUrl: string = null
    private requestAgainTimer: number = null
    private requestId: string = RandomGenerator.generateObjectId()

    public constructor(props: ICacheImageProps) {
        super(props)
        this.onError = this.onError.bind(this)
    }

    public onLoadComplete(source: any) {
        InteractionManager.runAfterInteractions(() => {
            if (source == null) {
                this.cancelTimer()
                this.requestAgainTimer = setTimeout(() => {
                    CacheHandler.getInstance().requestBinary(
                        this.requestId,
                        this.props.url,
                        true,
                        this.onLoadComplete.bind(this),
                        this.props.onProgressChanged
                    )
                }, 1000)
            }
            if (typeof this.props.onProgressChanged === 'function') {
                this.props.onProgressChanged(1, 1)
            }
            this.setState({URLCacheSource: source})
        })
    }

    public render(): JSX.Element {
        const isUrlEmpty = CommonValidator.isNullOrEmpty(this.props.url)
        if (this.lastUrl !== this.props.url) {
            this.lastUrl = this.props.url
            if (isUrlEmpty === false) {
                this.retryCount = 0
                InteractionManager.runAfterInteractions(() => {
                    CacheHandler.getInstance().cancelRequest(this.requestId)
                    CacheHandler.getInstance().requestBinary(
                        this.requestId,
                        this.props.url,
                        true,
                        this.onLoadComplete.bind(this),
                        this.props.onProgressChanged
                    )
                })
            }
        }
        if (this.state.URLCacheSource != null && isUrlEmpty === false) {
            return this.renderImage(this.state.URLCacheSource)
        }
        if (this.props.defaultSource != null) {
            return this.renderImage(this.props.defaultSource)
        }
        return this.renderImage(null)
    }

    public componentWillUnmount(): void {
        this.cancelTimer()
        this.isSceneMounted = false
        this.onLoadComplete = () => {}
        CacheHandler.getInstance().cancelRequest(this.requestId)
    }

    private renderImage(source: any): JSX.Element {
        if (source == null) {
            return (
                <ActivityIndicator
                    size={'small'}
                />
            )
        }
        const resizeMode = this.props.isCover === true ? 'cover' : 'contain'
        return (
            <Image
                source={source}
                style={[Styles.image, this.props.style]}
                resizeMode={resizeMode}
                onError={this.onError}
            />
        )
    }

    private onError(): void {
        this.retryCount++
        if (this.retryCount > 10) {
            return
        }
        this.cancelTimer()
        this.requestAgainTimer = setTimeout(async () => {
            if (this.isSceneMounted === true) {
                await CacheHandler.getInstance().invalidateCache(
                    this.props.url,
                    true
                )
                await CacheHandler.getInstance().requestBinary(
                    this.requestId,
                    this.props.url,
                    true,
                    this.onLoadComplete.bind(this),
                    this.props.onProgressChanged
                )
            }
        }, 1000)
    }

    private cancelTimer(): void {
        if (this.requestAgainTimer != null) {
            clearTimeout(this.requestAgainTimer)
        }
        this.requestAgainTimer = null
    }
}
