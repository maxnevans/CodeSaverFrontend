export const SET_CODE_SAMPLE = "screens/common/codeSampleEdit/api/SET_CODE_SAMPLE";
export const SET_NAME = "screens/common/codeSampleEdit/api/SET_NAME";
export const SET_DATA = "screens/common/codeSampleEdit/api/SET_DATA";
export const FETCH_CODE_SAMPLE = "screens/common/codeSampleEdit/api/FETCH_CODE_SAMPLE";
export const SAVE_CODE_SAMPLE = "screens/common/codeSampleEdit/api/SAVE_CODE_SAMPLE";
export const DELETE_CODE_SAMPLE = "screens/common/codeSampleEdit/api/DELETE_CODE_SAMPLE";
export const SET_ERROR = "screens/common/codeSampleEdit/api/SET_ERROR";
export const CLEAR_ERROR = "screens/common/codeSampleEdit/api/CLEAR_ERROR";
export const SET_DID_FETCH = "screens/common/codeSampleEdit/api/SET_DID_FETCH";
export const SET_DID_SAVE = "screens/common/codeSampleEdit/api/SET_DID_SAVE";
export const SET_DID_DELETE = "screens/common/codeSampleEdit/api/SET_DID_DELETE";
export const CLEAR_DID_FETCH = "screens/common/codeSampleEdit/api/CLEAR_DID_FETCH";
export const CLEAR_DID_SAVE = "screens/common/codeSampleEdit/api/CLEAR_DID_SAVE";
export const CLEAR_DID_DELETE = "screens/common/codeSampleEdit/api/CLEAR_DID_DELETE";

export const fetchCodeSample = (codeSample) => {
    return {
        type: FETCH_CODE_SAMPLE,
        payload: codeSample
    };
};

export const saveCodeSample = (codeSample) => {
    return {
        type: SAVE_CODE_SAMPLE,
        payload: codeSample
    };
};

export const deleteCodeSample = (codeSample) => {
    return {
        type: DELETE_CODE_SAMPLE,
        payload: codeSample
    }
};

export const setCodeSample = (codeSample) => {
    return {
        type: SET_CODE_SAMPLE,
        payload: codeSample,
    }
}

export const setName = (name) => {
    return {
        type: SET_NAME,
        payload: name
    };
};


export const setData = (dataType, data) => {
    return {
        type: SET_DATA,
        payload: {
            type: dataType,
            data
        }
    };
};


export const setError = (error) => {
    return {
        type: SET_ERROR,
        payload: error
    };
};

export const clearError = () => {
    return {
        type: CLEAR_ERROR,
    };
};

export const clearDidDelete = () => {
    return {
        type: CLEAR_DID_DELETE,
    };
};

export const clearDidFetch = () => {
    return {
        type: CLEAR_DID_FETCH,
    };
};

export const clearDidSave = () => {
    return {
        type: CLEAR_DID_SAVE,
    };
};

export const setDidDelete = () => {
    return {
        type: SET_DID_DELETE,
    };
};

export const setDidFetch = () => {
    return {
        type: SET_DID_FETCH,
    };
};

export const setDidSave = () => {
    return {
        type: SET_DID_SAVE,
    };
};