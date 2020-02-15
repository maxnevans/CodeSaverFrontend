import { GET_CODE, GET_LIST, EDIT_CODE, UPLOAD_CREATE_CODE, UPLOAD_EDIT_CODE, CREATE_CODE, DELETE_CODE } from "../destiantions";

class QueryManager {
    async getList() {
        return this._performJSONQuery(GET_LIST);
    }

    async getCodeSample(sampleId) {
        return this._performJSONQuery(GET_CODE, [sampleId]);
    }

    async editCodeSample(sampleId, codeName, newCodeSample) {
        const form = new FormData();

        form.append('code-name', codeName);
        form.append('code-sample', newCodeSample);

        return this._performJSONQuery(EDIT_CODE, [sampleId], form, false);
    }

    async uploadEditCodeSample(sampleId, codeName, codeSampleFile) {
        const form = new FormData();

        form.append('code-name', codeName);
        form.append('code-file', codeSampleFile);

        console.log(form);

        return this._performJSONQuery(UPLOAD_EDIT_CODE, [sampleId], form, false);
    } 

    async uploadCreateCodeSample(codeName, codeSampleFile) {
        const form = new FormData();

        form.append('code-name', codeName);
        form.append('code-file', codeSampleFile);

        return this._performJSONQuery(UPLOAD_CREATE_CODE, null, form, false);
    }

    async createCodeSample(codeName, newCodeSample) {
        const form = new FormData();

        form.append('code-name', codeName);
        form.append('code-sample', newCodeSample);

        return this._performJSONQuery(CREATE_CODE, null, form, false);
    }

    async deleteCodeSample(sampleId) {
        return this._performJSONQuery(DELETE_CODE, [sampleId]);
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

            return JSON.parse(dec.decode(array));
        }

        return null;
    }
}

export default QueryManager;