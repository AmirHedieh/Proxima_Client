import * as io from 'socket.io-client'
import { NetworkConfig } from '../Constants'

export class SocketManager {
    public static instance: SocketManager
    public static getInstance(): SocketManager {
        if (this.instance == null) {
            this.instance = new SocketManager()
        }
        return this.instance
    }

    private socket = io.connect(NetworkConfig.apiBaseUrl)

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

    public onRegister(callback: () => void) {
        this.socket.on('register', callback)
    }

    public register2 = () => {
        this.socket.emit('register')
        return new Promise((resolve) => {
            this.socket.on('register2', (response) => {
                resolve(response)
            })
        })
    }
}
