class CookieManager {
    setAutologin() {
        const expSeconds = 24 * 3600;

        const d = new Date();
        d.setTime(d.getTime() + (expSeconds*1000));

        document.cookie = `autologin=true;expires=${d.toUTCString()};path=/`;
    }

    unsetAutologin() {
        document.cookie = `autologin=true;expires=${(new Date(0)).toUTCString()};path=/`;
    }

    isAutologin() {
        return document.cookie.indexOf('autologin=true') != -1;
    }

    setSocketId(socketId) {
        this._setCookie('socket-id', socketId);
    }

    unsetSocketId() {
        this._unsetCookie('socket-id');
    }

    _setCookie(name, value, expSeconds = 0) {
        let expiresPart = '';
        if (expSeconds != 0) {
            const d = new Date();
            d.setTime(d.getTime() + (expSeconds*1000));
            expiresPart = `expires=${d.toUTCString()}`;
        }
       

        document.cookie = `${name}=${value}${expiresPart};path=/`;
    }

    _unsetCookie(name) {
        document.cookie = `${name}=null;expires=${(new Date(0)).toUTCString()};path=/`;
    }

    _getCookie(name) {
        const index = document.cookie.indexOf(name+'=');

        if (index == -1)
            return undefined;

        const indexOfTheEnd = document.cookie.indexOf(';', index + name.length + 1);
        const length = indexOfTheEnd - index - name.length - 1;

        return document.cookie.substr(index + name.length + 1, length);
    }
}

export default CookieManager;