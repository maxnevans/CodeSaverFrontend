import { GET_LIST } from "../destiantions";

class QueryManager {
    

    getList() {
        return this._performJSONQuery(GET_LIST);
    }

    getCodeSample(sampleId) {
        return this._performJSONQuery(GET_LIST, [sampleId]);
    }

    async _performJSONQuery(destination, destinationDetails = null, bodyData = null, isJSON = true) {
        const options = {
            method: destination.method.toUpperCase(),
        };

        if ((options.method != 'GET') && (options.method != 'HEAD')) {
            options.body = isJSON ? JSON.stringify(bodyData) : bodyData;
            options.headers = {
                'Content-type: ': isJSON ? 'application/json' : 'multipart/form-data'
            };
        }
        
        const response = await fetch(destination.url(destinationDetails), options);

        return await response.json();
    }
}

export default QueryManager;