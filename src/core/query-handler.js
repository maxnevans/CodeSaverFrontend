import HttpCodes from "./http-codes";

class QueryHandler {
    constructor(defaultQueryHandler) {
        this._handlers = new Map();


        defaultQueryHandler = defaultQueryHandler == null ? () => {} : defaultQueryHandler;
        this._setupDefault(defaultQueryHandler);
    }

    _setupDefault(defaultHandler) {
        Object.getOwnPropertyNames(HttpCodes).forEach(httpCodeName => this._handlers.set(HttpCodes[httpCodeName], defaultHandler));
    }

    setupHandler(httpCode, listener) {
        this._handlers.set(httpCode, listener);
    }

    getHandlers() {
        return this._handlers;
    }

    copy() {
        const copy = new QueryHandler(null);

        this._handlers.forEach((listener, statusCode) => copy._handlers.set(statusCode, listener));

        return copy;
    }
}

export default QueryHandler;