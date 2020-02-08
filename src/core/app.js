import QueryManager from "./aux/query-manager";

class App {
    constructor() {
        this._qm = new QueryManager();
    }

    getList() {
        return this._qm.getList();
    }

    getCodeSample() {
        return this._qm.getCodeSample();
    }
}

const coreApp = new App();

export default coreApp;