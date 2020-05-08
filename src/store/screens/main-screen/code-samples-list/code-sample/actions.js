export const DELETE = "screens/mainScreen/codeSamplesList/codeSample/DELETE";
export const DELETE_FAILED = "screens/mainScreen/codeSamplesList/codeSample/DELETE_FAILED";
export const EDIT = "screens/mainScreen/codeSamplesList/codeSample/EDIT";
export const EDIT_FAILED = "screens/mainScreen/codeSamplesList/codeSample/EDIT_FAILED";
export const SET_ERROR = "screens/mainScreen/codeSamplesList/codeSample/SET_ERROR";
export const CLEAR_ERROR = "screens/mainScreen/codeSamplesList/codeSample/CLEAR_ERROR";

export const deleteCodeSample = (codeSample) => {
    return {
        type: DELETE,
        payload: codeSample,
        codeSampleId: codeSample.id,
    };
};

export const editCodeSample = (codeSample) => {
    return {
        type: EDIT,
        payload: codeSample,
        codeSampleId: codeSample.id,
    };
};

export const setError = (error, codeSampleId) => {
    return {
        type: SET_ERROR,
        payload: error,
        codeSampleId
    };
};

export const clearError = (codeSampleId) => {
    return {
        type: CLEAR_ERROR,
        codeSampleId
    };
};