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
    LOGOUT_USER,
    GRAPHQL
} from "../destiantions";
import Queries from "../queries";

class QueryManager {
    async getList() {
        return this._graphQuery(Queries.CODE_LIST());
    }

    async getCodeSample(sampleId) {
        return this._graphQuery(Queries.CODE(sampleId));
    }

    async editCodeSample(sampleId, codeName, newCodeSample) {
        return this._graphQuery(Queries.EDIT_CODE(sampleId, codeName, newCodeSample));
    }

    async uploadEditCodeSample(sampleId, codeName, codeSampleFile) {
        const form = new FormData();

        form.append('code-name', codeName);
        form.append('code-file', codeSampleFile);

        return this._performJSONQuery(UPLOAD_EDIT_CODE, [sampleId], form, false);
    } 

    async uploadCreateCodeSample(codeName, codeSampleFile) {
        const form = new FormData();

        form.append('code-name', codeName);
        form.append('code-file', codeSampleFile);

        return this._performJSONQuery(UPLOAD_CREATE_CODE, null, form, false);
    }

    async createCodeSample(codeName, newCodeSample) {
        return this._graphQuery(Queries.CREATE_CODE(codeName, newCodeSample));
    }

    async deleteCodeSample(sampleId) {
        return this._graphQuery(Queries.DELETE_CODE(sampleId));
    }

    async registerUser(login, password) {
        return this._graphQuery(Queries.REGISTER(login, password));
    }

    async loginUser(login, password) {
        return this._graphQuery(Queries.AUTHORIZE(login, password));
    }

    async testAuth() {
        return this._graphQuery(Queries.ACCOUNT());
    }

    async logoutUser() {
        return this._graphQuery(Queries.UNAUTHORIZE());
    }

    async _graphQuery(queryData) {
        return this._performJSONQuery(GRAPHQL, null, queryData);
    }

    async _performJSONQuery(destination, destinationDetails = null, bodyData = null, isJSON = true) {
        const options = {
            method: destination.method.toUpperCase(),
        };

        if ((options.method != 'GET') && (options.method != 'HEAD')) {
            if (isJSON) {
                options.body = JSON.stringify(bodyData);
                options.headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                };
            } else  {
                options.body = bodyData;
            }
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