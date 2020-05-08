export const SET_NAME = "screens/common/codeSampleEdit/editing/SET_NAME";
export const SET_DATA = "screens/common/codeSampleEdit/editing/SET_DATA";
export const SET_CODE_SAMPLE = "screens/common/codeSampleEdit/editing/SET_CODE_SAMPLE";
export const CLEAR_CODE_SAMPLE = "screens/common/codeSampleEdit/editing/CLEAR_CODE_SAMPLE";
export const UPDATE_MODS = "screens/common/codeSampleEdit/editing/UPDATE_MODS";


export const setCodeSample = (codeSample) => {
    return {
        type: SET_CODE_SAMPLE,
        payload: codeSample
    };
};

export const setCodeSampleName = (name) => {
    return {
        type: SET_NAME,
        payload: name
    };
};


export const setCodeSampleData = (dataType, data) => {
    return {
        type: SET_DATA,
        payload: {
            type: dataType,
            data
        }
    };
};

export const clearCodeSample = () => {
    return {
        type: CLEAR_CODE_SAMPLE
    };
};

export const updateMods = (mods) => {
    return {
        type: UPDATE_MODS,
        payload: mods
    };
};