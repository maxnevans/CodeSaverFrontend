import QueryManager from "./assist/query-manager";
import CookieManager from "./assist/cookie-manager";
import ResponseManager from "./assist/response-manager";
import Querier from './querier';
import io from "socket.io-client";

class App {
    #qm;
    #cm;
    #io;
    
    constructor(glob) {
        this.#qm = new QueryManager();
        this.#cm = new CookieManager();
        this.#io = io.connect('http://localhost:8080');

        this.#setupHandlers(glob);
    }

    #setupHandlers(glob) {
        glob.onunhandledrejection = this.#unhandledRejectionHandler.bind(this);
    }

    #unhandledRejectionHandler(event) {
        event.preventDefault();

        console.log('Unahandled Rejection: ', event.reason);
    }

    autologin(state) {
        if (state == null)
            return this.#cm.isAutologin(); 

        if (state)
            this.#cm.setAutologin();
        else
            this.#cm.unsetAutologin();
    }

    addSocketMessageHandler(message, handler) {
        this.#io.on(message, handler);
    }

    authenticateSocket(userId, token) {
        this.#io.on('auth', ({socketId}) => {
            this.#cm.setSocketId(socketId);
        });

        this.#io.emit('auth', {id: userId, token});
    }

    prepareToQuery(queryHandler) {
        const responseManager = new ResponseManager(queryHandler.getHandlers());
        return new Querier(this.#qm, responseManager);
    }
}
const coreApp = new App(window);

export default coreApp;