class Querier {
    #qm
    #rm
    
    constructor(queryManager, responseManager) {
        this.#qm = queryManager;
        this.#rm = responseManager;
    }

    getList() {
        this.executeQuery(this.#qm.getList.bind(this.#qm));
    }

    getCodeSample(sampleId) {
        this.executeQuery(this.#qm.getCodeSample.bind(this.#qm, sampleId));
    }

    editCodeSample(sampleId, codeName, newCodeContent) {
        this.executeQuery(this.#qm.editCodeSample.bind(this.#qm, sampleId, codeName, newCodeContent));
    }

    uploadEditCodeSample(sampleId, codeName, fileCodeSample) {
        this.executeQuery(this.#qm.uploadEditCodeSample.bind(this.#qm, sampleId, codeName, fileCodeSample));
    }

    createCodeSample(codeName, newCodeSample) {
        this.executeQuery(this.#qm.createCodeSample.bind(this.#qm, codeName, newCodeSample));
    }

    uploadCreateCodeSample(codeName, fileCodeSample) {
        this.executeQuery(this.#qm.uploadCreateCodeSample.bind(this.#qm, codeName, fileCodeSample));
    }

    deleteCodeSample(sampleId) {
        this.executeQuery(this.#qm.deleteCodeSample.bind(this.#qm, sampleId));
    }

    registerUser(login, password) {
        this.executeQuery(this.#qm.registerUser.bind(this.#qm, login, password));
    }

    loginUser(login, password) {
        this.executeQuery(this.#qm.loginUser.bind(this.#qm, login, password));
    }

    logoutUser() {
        this.executeQuery(this.#qm.logoutUser.bind(this.#qm));
    }

    testAuth() {
        this.executeQuery(this.#qm.testAuth.bind(this.#qm));
    }

    getAuthInfo() {
        this.executeQuery(this.#qm.getAuthInfo.bind(this.#qm));
    }

    executeQuery(queryFunc) {
        queryFunc()
            .then(res => this.#catchResponse(res, this.#rm))
            .catch(err => this.#catchResponse(err, this.#rm));
    }

    #catchResponse(response, responseManager) {
        if (typeof response == 'object' && response.status != null && response.body !== undefined) {
            responseManager.handleResponse(response.status, response.body);

            return;
        }
    }
}

export default Querier;