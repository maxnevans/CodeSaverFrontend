import CookieManagerCore from "./cookie-manager-core";

export default class CookieManager extends CookieManagerCore {
    static setSocketId(id) {
        this.set("socket-id", id);
    }
}