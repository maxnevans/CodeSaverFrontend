export default class CookieManagerCore {
    static set(name, value, expSeconds = 0, path = "/") {
        this._setRaw(name, value, expSeconds, path);
    }

    static unset(key) {
        this._unsetRaw(key);
    }

    static get(key) {
        return this._getRaw(key);
    }

    static getAll() {        
        return this._parseRaw(document.cookie);
    }

    static has(key) {
        return this._getRaw(key) !== undefined;
    }

    static _getRaw(name) {
        const key = `${name}=`;
        const index = document.cookie.indexOf(key);

        if (index == -1)
            return undefined;

        const startIndex = index + key.length;
        const endIndex = document.cookie.indexOf(";", startIndex);
        return document.cookie.substring(startIndex, endIndex);
    }

    static _parseRaw(cookie) {
        const ret = {};
        cookie.split(";").map(keyValue => {
            let kvSplitted = keyValue.split("=");
            ret[kvSplitted[0]] = kvSplitted[1];
        });
        return ret;
    }

    static _setRaw(name, value, expSeconds = null, path = "/") {
        let expiresPart = '';
        if (expSeconds != 0) {
            const d = new Date();
            d.setTime(d.getTime() + (expSeconds*1000));
            expSeconds != null ? expiresPart = `expires=${d.toUTCString()}` : null;
        }

        document.cookie = `${name}=${value}${expiresPart};path=${path}`;
    }

    static _unsetRaw(name) {
        document.cookie = `${name}=null;expires=${(new Date(0)).toUTCString()};path=/`;
    }
}