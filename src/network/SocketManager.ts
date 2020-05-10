import * as io from 'socket.io-client'
import { NetworkConfig } from '../Constants'
import { CustomResponse } from './CustomResponse'

export class SocketManager {
    public static instance: SocketManager
    public static getInstance(): SocketManager {
        if (this.instance == null) {
            this.instance = new SocketManager()
        }
        return this.instance
    }

    private socket = io.connect(NetworkConfig.apiBaseUrl) // change to (= null) later

    private constructor() {
        this.socket = io.connect(NetworkConfig.apiBaseUrl)
    }

    public onConnect(onConnect: () => void) {
        this.socket.on('connect', onConnect)
    }

    public onReconnect(onReconnect: () => void) {
        this.socket.on('reconnect', onReconnect)
    }

    public register() {
        this.socket.emit('register')
    }

    public onRegister(callback: (result: CustomResponse) => void) {
        this.socket.on('register', (response) => {
            const customResponse = new CustomResponse(response)
            callback(customResponse)
        })
    }

    public authorize(params: { id: number }) {
        this.socket.emit('authorize', params)
    }

    public onCategory(callback: (result: CustomResponse) => void) {
        this.socket.on('category', (response) => {
            const customResponse = new CustomResponse(response)
            callback(customResponse)
        })
    }

    public onVersion(callback: (result: CustomResponse) => void) {
        this.socket.on('version', (response) => {
            const customResponse = new CustomResponse(response)
            callback(customResponse)
        })
    }

    public majorChange(params: { major: number }) {
        this.socket.emit('majorChange', params)
    }

    public minorChange(params: { minor: number }) {
        this.socket.emit('minorChange', params)
    }

    public onMajorChange(callback: (result: CustomResponse) => void) {
        this.socket.on('majorChange', (response) => {
            const customResponse = new CustomResponse(response)
            callback(customResponse)
        })
    }

    public onMinorChange(callback: (result: CustomResponse) => void) {
        this.socket.on('minorChange', (response) => {
            const customResponse = new CustomResponse(response)
            callback(customResponse)
        })
    }
}
