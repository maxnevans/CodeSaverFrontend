export const EDITING_SET_NAME = "screens/common/codeSampleEdit/editing/SET_NAME";
export const EDITING_SET_DATA = "screens/common/codeSampleEdit/editing/SET_DATA";
export const EDITING_SET_CODE_SAMPLE = "screens/common/codeSampleEdit/editing/SET_CODE_SAMPLE";


export const setCodeSample = (codeSample) => {
    return {
        type: EDITING_SET_CODE_SAMPLE,
        payload: codeSample
    };
};

export const setCodeSampleName = (name) => {
    return {
        type: EDITING_SET_NAME,
        payload: name
    };
};


export const setCodeSampleData = (dataType, data) => {
    return {
        type: EDITING_SET_DATA,
        payload: {
            type: dataType,
            data
        }
    };
};