export const SET_OLD_PASSWORD = "popups/passwordChange/SET_OLD_PASSWORD";
export const SET_OLD_PASSWORD_API = "popups/passwordChange/SET_OLD_PASSWORD_API";
export const SET_PASSWORD = "popups/passwordChange/SET_PASSWORD";
export const SET_PASSWORD_REPEAT = "popups/passwordChange/REPORT_RETURN";
export const CHANGE_PASSWORD = "popups/passwordChange/CHANGE_PASSWORD";
export const FETCH_PASSWORD = "popups/passwordChange/FETCH_PASSWORD";
export const SET_DID_FETCH = "popups/passwordChange/SET_DID_FETCH";
export const CLEAR_DID_FETCH = "popups/passwordChange/CLEAR_DID_FETCH";
export const SET_ERROR = "popups/passwordChange/SET_ERROR";
export const CLEAR_ERROR = "popups/passwordChange/CLEAR_ERROR";
export const SET_DID_CHANGE = "popups/passwordChange/SET_DID_CHANGE";
export const CLEAR_DID_CHANGE = "popups/passwordChange/CLEAR_DID_CHANGE";


export const setPassword = (password) => {
    return {
        type: SET_PASSWORD,
        payload: password,
    };
};

export const setOldPassword = (password) => {
    return {
        type: SET_OLD_PASSWORD,
        payload: password,
    };
};


export const setOldPasswordApi = (password) => {
    return {
        type: SET_OLD_PASSWORD_API,
        payload: password,
    };
};


export const setPasswordRepeat = (password) => {
    return {
        type: SET_PASSWORD_REPEAT,
        payload: password,
    };
};

export const changePassword = (oldPassword, password, passwordRepeat) => {
    return {
        type: CHANGE_PASSWORD,
        payload: {
            oldPassword,
            password,
            passwordRepeat
        }
    };
};

export const fetchPassword = () => {
    return {
        type: FETCH_PASSWORD,
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


export const setDidFetch = () => {
    return {
        type: SET_DID_FETCH,
    };
};

export const clearDidFetch = () => {
    return {
        type: CLEAR_DID_FETCH
    };
};

export const setDidChange = () => {
    return {
        type: SET_DID_CHANGE,
    };
};

export const clearDidChange = () => {
    return {
        type: CLEAR_DID_CHANGE
    };
};