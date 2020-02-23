class ResponseManager extends EventTarget {
    constructor(handlers) {
        super();
        handlers.forEach((listener, statusCode) => this.on(statusCode, listener));
    }

    on(httpCode, listener) {
        super.addEventListener(httpCode.toString(), (event) => listener(httpCode, event.body));
    }

    handleResponse(statusCode, body) {
        const event = new Event(statusCode.toString());
        event.body = body;
        super.dispatchEvent(event);
    }
}

export default ResponseManager;