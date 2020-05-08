export const FETCH_USER = "screens/userProfile/api/FETCH_USER";
export const SAVE_USER = "screens/userProfile/api/SAVE_USER";
export const DELETE_USER = "screens/userProfile/api/DELETE_USER";
export const SET_ERROR = "screens/userProfile/api/SET_ERROR";
export const CLEAR_ERROR = "screens/userProfile/api/CLEAR_ERROR";
export const UPLOAD_AVATAR = "screens/userProfile/api/UPLOAD_AVATAR";
export const SET_DID_FETCH = "screens/userProfile/api/SET_DID_FETCH";
export const SET_DID_SAVE = "screens/userProfile/api/SET_DID_SAVE";
export const SET_DID_DELETE = "screens/userProfile/api/SET_DID_DELETE";
export const SET_DID_UPLOAD_AVATAR = "screens/userProfile/api/SET_DID_UPLOAD_AVATAR";
export const CLEAR_DID_FETCH = "screens/userProfile/api/CLEAR_DID_FETCH";
export const CLEAR_DID_SAVE = "screens/userProfile/api/CLEAR_DID_SAVE";
export const CLEAR_DID_DELETE = "screens/userProfile/api/CLEAR_DID_DELETE";
export const CLEAR_DID_UPLOAD_AVATAR = "screens/userProfile/api/CLEAR_DID_UPLOAD_AVATAR";
export const REPORT_SAVE = "screens/userProfile/api/REPORT_SAVE";
export const REPORT_DELETE = "screens/userProfile/api/REPORT_DELETE";
export const REPORT_FETCH = "screens/userProfile/api/REPORT_FETCH";
export const REPORT_UPLOAD_AVATAR = "screens/userProfile/api/REPORT_UPLOAD_AVATAR";
export const REPORT_DELETE_USER_CONFIRMATION = "screens/userProfile/api/REPORT_DELETE_USER_CONFIRMATION";
export const ASK_DELETE_USER_CONFIRMATION = "screens/userProfile/api/DELETE_USER_CONFIRMATION";

export const fetchUser = (user) => {
    return {
        type: FETCH_USER,
        payload: user
    };
};

export const saveUser = (user) => {
    return {
        type: SAVE_USER,
        payload: user
    };
};

export const deleteUser = (user) => {
    return {
        type: DELETE_USER,
        payload: user
    };
};


export const uploadAvatar = (file) => {
    return {
        type: UPLOAD_AVATAR,
        payload: file
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

export const clearDidUploadAvatar = () => {
    return {
        type: CLEAR_DID_UPLOAD_AVATAR,
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

export const setDidUploadAvatar = () => {
    return {
        type: SET_DID_UPLOAD_AVATAR,
    };
};

export const reportSave = (user) => {
    return {
        type: REPORT_SAVE,
        payload: user,
    };
};


export const reportDelete = (user) => {
    return {
        type: REPORT_DELETE,
        payload: user,
    };
};

export const reportFetch = (user) => {
    return {
        type: REPORT_FETCH,
        payload: user,
    };
};

export const reportUploadAvatar = (file) => {
    return {
        type: REPORT_UPLOAD_AVATAR,
        payload: file,
    };
};

export const reportDeleteUserConfirmation = (value) => {
    return {
        type: REPORT_DELETE_USER_CONFIRMATION,
        payload: value,
    };
};


export const askDeleteUserConfirmation = () => {
    return {
        type: ASK_DELETE_USER_CONFIRMATION,
    };
};