import QueryManager from "./aux/query-manager";
import CookieManager from "./aux/cookie-manager";

class App {
    constructor() {
        this._qm = new QueryManager();
        this._cm = new CookieManager();
    }

    async getList() {
        return this._qm.getList();
    }

    async getCodeSample(sampleId) {
        return this._qm.getCodeSample(sampleId);
    }

    async editCodeSample(sampleId, codeName, newCodeContent) {
        return this._qm.editCodeSample(sampleId, codeName, newCodeContent);
    }

    async uploadEditCodeSample(sampleId, codeName, fileCodeSample) {
        return this._qm.uploadEditCodeSample(sampleId, codeName, fileCodeSample);
    }

    async createCodeSample(codeName, newCodeSample) {
        return this._qm.createCodeSample(codeName, newCodeSample);
    }

    async uploadCreateCodeSample(codeName, fileCodeSample) {
        return this._qm.uploadCreateCodeSample(codeName, fileCodeSample);
    }

    async deleteCodeSample(sampleId) {
        return this._qm.deleteCodeSample(sampleId);
    }

    async registerUser(login, password) {
        return this._qm.registerUser(login, password);
    }

    async loginUser(login, password) {
        return this._qm.loginUser(login, password);
    }

    async logoutUser() {
        return this._qm.logoutUser();
    }

    async testAuth() {
        return this._qm.testAuth();
    }

    autologin(state) {
        if (state == null)
            return this._cm.isAutologin(); 

        if (state)
            this._cm.setAutologin();
        else
            this._cm.unsetAutologin();
    }
}

const coreApp = new App();

export default coreApp;