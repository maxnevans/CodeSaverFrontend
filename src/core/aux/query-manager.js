import { 
    GET_CODE, 
    GET_LIST, 
    EDIT_CODE, 
    UPLOAD_CREATE_CODE, 
    UPLOAD_EDIT_CODE, 
    CREATE_CODE, 
    DELETE_CODE,
    LOGIN_USER,
    REGISTER_USER,
    TEST_AUTH,
    LOGOUT_USER
} from "../destiantions";

class QueryManager {
    async getList() {
        return this._performJSONQuery(GET_LIST);
    }

    async getCodeSample(sampleId) {
        return this._performJSONQuery(GET_CODE, [sampleId]).body;
    }

    async editCodeSample(sampleId, codeName, newCodeSample) {
        const form = new FormData();

        form.append('code-name', codeName);
        form.append('code-sample', newCodeSample);

        return this._performJSONQuery(EDIT_CODE, [sampleId], form, false).body;
    }

    async uploadEditCodeSample(sampleId, codeName, codeSampleFile) {
        const form = new FormData();

        form.append('code-name', codeName);
        form.append('code-file', codeSampleFile);

        console.log(form);

        return this._performJSONQuery(UPLOAD_EDIT_CODE, [sampleId], form, false).body;
    } 

    async uploadCreateCodeSample(codeName, codeSampleFile) {
        const form = new FormData();

        form.append('code-name', codeName);
        form.append('code-file', codeSampleFile);

        return this._performJSONQuery(UPLOAD_CREATE_CODE, null, form, false).body;
    }

    async createCodeSample(codeName, newCodeSample) {
        const form = new FormData();

        form.append('code-name', codeName);
        form.append('code-sample', newCodeSample);

        return this._performJSONQuery(CREATE_CODE, null, form, false).body;
    }

    async deleteCodeSample(sampleId) {
        return this._performJSONQuery(DELETE_CODE, [sampleId]).body;
    }

    async registerUser(login, password) {
        const form = new FormData();

        form.append('login', login);
        form.append('password', password);

        return this._performJSONQuery(REGISTER_USER, null, form, false).body;
    }

    async loginUser(login, password) {
        const form = new FormData();

        form.append('login', login);
        form.append('password', password);

        const res = await this._performJSONQuery(LOGIN_USER, null, form, false);

        if (res.status != 200)
            throw res;

        return res.body;
    }

    async testAuth() {
        const res = await this._performJSONQuery(TEST_AUTH);

        if (res.status != 200)
            throw res;
        return res.body;
    }

    async logoutUser() {
        return this._performJSONQuery(LOGOUT_USER).body;
    }

    async _performJSONQuery(destination, destinationDetails = null, bodyData = null, isJSON = true) {
        const options = {
            method: destination.method.toUpperCase(),
        };

        if ((options.method != 'GET') && (options.method != 'HEAD')) {
            options.body = isJSON ? JSON.stringify(bodyData) : bodyData;
        }
        
        const response = await fetch(destination.url(destinationDetails), options);
        const array = await response.arrayBuffer();

        if (array.byteLength > 0) {
            const dec = new TextDecoder('utf-8');
            const decoded = dec.decode(array);

            try {
                return {status: response.status, body: JSON.parse(decoded)};
            } catch(error) {
                return {status: response.status, body: decoded};
            }
        }

        return {status: response.status, body: null};
    }
}

export default QueryManager;