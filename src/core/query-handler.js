import HttpCodes from "./http-codes";

class QueryHandler {
    #handlers;

    constructor(defaultQueryHandler) {
        this.#handlers = new Map();


        defaultQueryHandler = defaultQueryHandler == null ? () => {} : defaultQueryHandler;
        this.#setupDefault(defaultQueryHandler);
    }

    #setupDefault(defaultHandler) {
        Object.getOwnPropertyNames(HttpCodes).forEach(httpCodeName => this.#handlers.set(HttpCodes[httpCodeName], defaultHandler));
    }

    setupHandler(httpCode, listener) {
        this.#handlers.set(httpCode, listener);
    }

    getHandlers() {
        return this.#handlers;
    }

    copy() {
        const copy = new QueryHandler(null);

        this.#handlers.forEach((listener, statusCode) => copy.#handlers.set(statusCode, listener));

        return copy;
    }
}

export default QueryHandler;