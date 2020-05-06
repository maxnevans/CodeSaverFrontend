export const DELETE = "screens/mainScreen/codeSamplesList/codeSample/DELETE";
export const DELETE_FAILED = "screens/mainScreen/codeSamplesList/codeSample/DELETE_FAILED";
export const EDIT = "screens/mainScreen/codeSamplesList/codeSample/EDIT";
export const EDIT_FAILED = "screens/mainScreen/codeSamplesList/codeSample/EDIT_FAILED";

export const deleteCodeSample = (codeSample) => {
    return {
        type: DELETE,
        payload: codeSample,
    };
};

export const editCodeSample = (codeSample) => {
    return {
        type: EDIT,
        payload: codeSample,
    };
};