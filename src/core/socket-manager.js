import io from "socket.io-client";
import { SOURCE } from "./destiantions";
import CookieManager from "./cookie-manager";

export default class SocketManager {
    static #io;

    static connect() {
        this.#io = io.connect(SOURCE);
    }

    static addSocketMessageHandler(message, handler) {
        this.#io.on(message, handler);
    }

    static authenticateSocket(userId, token) {
        this.#io.on('auth', ({socketId}) => {
            CookieManager.setSocketId(socketId);
        });

        this.#io.emit('auth', {id: userId, token});
    }
}