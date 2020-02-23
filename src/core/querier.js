class Querier {
    constructor(queryManager, responseManager) {
        this._qm = queryManager;
        this._rm = responseManager;
    }

    getList() {
        this.executeQuery(this._qm.getList.bind(this._qm));
    }

    getCodeSample(sampleId) {
        this.executeQuery(this._qm.getCodeSample.bind(this._qm, sampleId));
    }

    editCodeSample(sampleId, codeName, newCodeContent) {
        this.executeQuery(this._qm.editCodeSample.bind(this._qm, sampleId, codeName, newCodeContent));
    }

    uploadEditCodeSample(sampleId, codeName, fileCodeSample) {
        this.executeQuery(this._qm.uploadEditCodeSample.bind(this._qm, sampleId, codeName, fileCodeSample));
    }

    createCodeSample(codeName, newCodeSample) {
        this.executeQuery(this._qm.createCodeSample.bind(this._qm, codeName, newCodeSample));
    }

    uploadCreateCodeSample(codeName, fileCodeSample) {
        this.executeQuery(this._qm.uploadCreateCodeSample.bind(this._qm, codeName, fileCodeSample));
    }

    deleteCodeSample(sampleId) {
        this.executeQuery(this._qm.deleteCodeSample.bind(this._qm, sampleId));
    }

    registerUser(login, password) {
        this.executeQuery(this._qm.registerUser.bind(this._qm, login, password));
    }

    loginUser(login, password) {
        this.executeQuery(this._qm.loginUser.bind(this._qm, login, password));
    }

    logoutUser() {
        this.executeQuery(this._qm.logoutUser.bind(this._qm));
    }

    testAuth() {
        this.executeQuery(this._qm.testAuth.bind(this._qm));
    }

    executeQuery(queryFunc) {
        queryFunc()
            .then(res => this._catchResponse(res, this._rm))
            .catch(err => this._catchResponse(err, this._rm));
    }

    _catchResponse(response, responseManager) {
        if (typeof response == 'object' && response.status != null && response.body !== undefined) {
            responseManager.handleResponse(response.status, response.body);

            return;
        }
    }
}

export default Querier;