import {GRAPHQL} from "./destiantions";

export class APIError extends Error {
    constructor(data, statusCode, url, redirected = null) {
        super(`Response status code: ${statusCode}; Request url: ${url}; Redirected: ${redirected ?? "not provided"}`);
        this.statusCode = statusCode; 
        this.name = this.constructor.name;
        this.url = url;
        this.redirected = redirected;
        this.data = data;
    }
}

export const UNDEFINED = 0;
export const UNAUTHORIZED = 401;
export const NOT_FOUND = 404;

export class APILogicError extends Error {
    constructor(message, logicCode = UNDEFINED) {
        super(message);
        this.name = this.constructor.name;
        this.logicCode = logicCode;
    }
}

export class APIServerError extends Error {
    constructor(errors) {
        super("Server errors occured!");
        this.name = this.constructor.name;
        this.errors = errors;
    }
}

export class APIGraphQLError extends Error {
    constructor(errors) {
        super("GraphQL error occured!");
        this.name = this.constructor.name;
        this.errors = errors;
    }
}

export default class APICore {
    
    /**
     * Executes GraphQL query to endpoint
     * @param {string} query GraphQL string query 
     */
    static async graph(query) {
        try {
            const result = await APICore._decodeQuery(await APICore._postQuery(GRAPHQL, query));
            if (result.errors)
                throw new APIServerError(result.errors);
            return result.data;
        } catch (e) {
            if (e instanceof APIError) 
                throw this._translateError(e);
            throw e;
        }
    }

    /**
     * Get fetcher
     * @param {string} path 
     * @param {any} params 
     */
    static async fetch(path, params) {     
        return APICore._decodeQuery(await APICore._getQuery(path, params));
    }

    /**
     * 
     * @param {string} path Url path
     * @param {any} params Url params. Can be array of "key=value" or object  {key: value}
     * @param {[{name: string, data: File}]} files Files array to be uploaded 
     * @param {[{name: string, data: any}]} dataFields Fields to be packed to the body
     */
    static async upload(path, params, dataFields, encodeDataFields = true) {
        const form = new FormData();
        Object.getOwnPropertyNames(dataFields ?? {}).forEach(fieldName => {
            const field = dataFields[fieldName];

            if (Array.isArray(field)) {
                for (const file of field)
                    form.append(`${fieldName}[]`, file);
                return;
            }

            if (field instanceof File) {
                form.append(fieldName, field);
                return;
            }

            form.append(fieldName, encodeDataFields ? JSON.stringify(field) : field);
        });
        return APICore._decodeQuery(await APICore._postQuery(path, form, false, params));
    }

    /**
     * Translates APIError to APILogicError or APIServerError
     * @param {APIError} e API error instance
     */
    static _translateError(e) {
        if (e.statusCode == 400)
            return new APIGraphQLError(JSON.parse(e.data));
        if (e.statusCode == 401)
            return new APILogicError("Unauthorized!", UNAUTHORIZED);
        if (e.statusCode == 404)
            return new APILogicError("Not found!", NOT_FOUND);
        if (e.statusCode >= 500)
            return new APIServerError([e.data]);

        return e;
    }

    static async _getQuery(path, params = null) {
        return APICore._fetch(APICore._createUrl(path, params ?? {}));
    }

    static async _postQuery(path, data = null, encodeData = true, params = null) {
        const options = { method: "POST" };
        if (data) {
            if (encodeData) {
                options.body = JSON.stringify(data);
                options.headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                };
            } else {
                options.body = data;
            }
        }
        return APICore._fetch(APICore._createUrl(path, params ?? {}), options);
    }

    /**
     * Decodes _getQuery or _postQuery response object.
     * @param {Response} response 
     * @returns {any} Returns decoded object if it is possible to deocde or plain text. Returns undefined if:
     * - body is empty
     * - fetch aborted
     * @throws Throws APIError if status code is not in 200 group.
     */
    static async _decodeQuery(response, decodeJson = true) {
        if (response.status < 200 || response.status >= 300) {
            throw new APIError(await response.text(), response.status, response.url, response.redirected);
        }
        
        const array = await response.arrayBuffer();

        if (array.byteLength > 0) {
            const dec = new TextDecoder('utf-8');
            const decoded = dec.decode(array);

            try {
                return decodeJson ? JSON.parse(decoded) : decoded;
            } catch (e) {
                if (e?.name == "SyntaxError") {
                    console.warn("Failed to decode json! Returning plain response");
                    return decoded;
                }
                throw e;
            }
        }

        return undefined;
    }

    static async _fetch(...args) {
        try {
            return fetch(...args);
        } catch (e) {
            if (e?.name == "AbortError")
                return undefined;
            
            if (e?.name == "TypeError") {
                console.warn("The specified URL string includes user credentials. This information should instead be provided using an Authorization header.");
                throw e;
            }

            throw e;
        }
    }

    /**
     * Creates url from path and params
     * @param {String} path 
     * @param {Object|Array} params Url params. Can be array of "key=value" or object  {key: value}
     */
    static _createUrl(path, params) {
        let joinedParams = "";
        if (Array.isArray(params)) {
            joinedParams = params.join("&");
        } else {
            joinedParams = Object.getOwnPropertyNames(params).reduce((acc, cur) => acc + `${cur}=${params[cur]}&`, "").slice(0, -1);
        }
        return path + ((joinedParams.length > 0) ? "?" + joinedParams : "");
    }
}