export const RETURN_VALUE = "popups/confirm/RETURN_VALUE";
export const SET_RETURN_VALUE = "popups/confirm/SET_RETURN_VALUE";
export const SET_DID_RETURN = "popups/confirm/SET_DID_RETURN";
export const CLEAR_DID_RETURN = "popups/confirm/CLEAR_DID_RETURN";
export const REPORT_RETURN = "popups/confirm/REPORT_RETURN";

export const returnValue = (value) => {
    return {
        type: RETURN_VALUE,
        payload: value,
    };
};

export const setReturnValue = (value) => {
    return {
        type:SET_RETURN_VALUE,
        payload: value,
    };
};

export const setDidReturn = () => {
    return {
        type:SET_DID_RETURN
    };
};

export const clearDidReturn = () => {
    return {
        type:CLEAR_DID_RETURN
    };
};

export const reportReturn = (value) => {
    return {
        type: REPORT_RETURN,
        payload: value,
    };
};