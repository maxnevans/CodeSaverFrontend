import QueryManager from "./aux/query-manager";
import CookieManager from "./aux/cookie-manager";
import ResponseManager from "./aux/response-manager";
import Querier from './querier';

class App {
    constructor(glob) {
        this._qm = new QueryManager();
        this._cm = new CookieManager();

        this._setupHandlers(glob);
    }

    _setupHandlers(glob) {
        glob.onunhandledrejection = this._unhandledRejectionHandler.bind(this);
    }

    _unhandledRejectionHandler(event) {
        event.preventDefault();

        console.log('Unahandled Rejection: ', event.reason);
    }

    autologin(state) {
        if (state == null)
            return this._cm.isAutologin(); 

        if (state)
            this._cm.setAutologin();
        else
            this._cm.unsetAutologin();
    }

    prepareToQuery(queryHandler) {
        const responseManager = new ResponseManager(queryHandler.getHandlers());
        return new Querier(this._qm, responseManager);
    }
}
const coreApp = new App(window);

export default coreApp;