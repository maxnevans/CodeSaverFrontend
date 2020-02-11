import QueryManager from "./aux/query-manager";

class App {
    constructor() {
        this._qm = new QueryManager();
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
}

const coreApp = new App();

export default coreApp;