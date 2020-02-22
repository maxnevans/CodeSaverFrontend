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
}

export default CookieManager;