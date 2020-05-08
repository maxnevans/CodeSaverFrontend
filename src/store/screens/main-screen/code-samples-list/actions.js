export const ADD_CODE_SAMPLE = "screens/mainScreen/codeSamplesList/ADD_CODE_SAMPLE";
export const DELETE_CODE_SAMPLE = "screens/mainScreen/codeSamplesList/DELETE_CODE_SAMPLE";
export const FETCH_CODE_SAMPLES = "screens/mainScreen/codeSamplesList/FETCH_CODE_SAMPLES";
export const SET_CODE_SAMPLES = "screens/mainScreen/codeSamplesList/SET_CODE_SAMPLES";
export const SET_ERROR = "screens/mainScreen/codeSamplesList/SET_ERROR";
export const CLEAR_ERROR = "screens/mainScreen/codeSamplesList/CLEAR_ERROR";
export const REPORT_FETCH = "screens/mainScreen/codeSamplesList/REPORT_FETCH";
export const REPORT_ERROR = "screens/mainScreen/codeSamplesList/REPORT_ERROR";

export const addCodeSample = (codeSample) => {
    return {
        type: ADD_CODE_SAMPLE,
        payload: codeSample,
    };
};

export const deleteCodeSample = (codeSample) => {
    return {
        type: DELETE_CODE_SAMPLE,
        payload: codeSample,
    };
};

export const fetchCodeSamples = () => {
    return {
        type: FETCH_CODE_SAMPLES,
    };
};

export const setCodeSamples = (codeSamples) => {
    return {
        type: SET_CODE_SAMPLES,
        payload: codeSamples
    };
};

export const setError = (error) => {
    return {
        type: SET_ERROR,
        payload: error,
    };
};


export const clearError = () => {
    return {
        type: CLEAR_ERROR
    };
};

export const reportFetch = (codeSamples) => {
    return {
        type: REPORT_FETCH,
        payload: codeSamples,
    };
};

export const reportError = (error) => {
    return {
        type: REPORT_FETCH,
        payload: error,
    };
};