export const USER_SET = 'user/PUT';
export const USER_CLEAR = 'user/CLEAR';
export const USER_REGISTER = 'user/REGISTER';
export const USER_LOGIN = 'user/LOGIN';
export const USER_LOGOUT = 'user/LOGOUT';
export const USER_ERROR = 'user/ERROR';
export const USER_FETCH = 'user/FETCH';
export const USER_EDIT = 'user/EDIT';
export const USER_DELETE = 'user/DELETE';
export const SET_AVATARS = 'user/PUSH_AVATAR';
export const UNSET_AVATARS = 'user/DELETE_AVATAR';
export const USER_CLEAR_ERROR = 'user/ERROR';
export const REPORT_USER_REGISTER = 'user/REPORT_USER_REGISTERED';
export const REPORT_USER_LOGIN = 'user/REPORT_USER_LOGINED';
export const REPORT_USER_LOGOUT = 'user/REPORT_USER_LOGINED';
export const REPORT_USER_FETCH = 'user/REPORT_USER_FETCH';
export const REPORT_USER_EDIT = 'user/REPORT_USER_EDIT';
export const REPORT_USER_DELETE = 'user/REPORT_USER_DELETE';
export const REPORT_USER_PUSH_AVATAR = 'user/REPORT_USER_PUSH_AVATAR';
export const REPORT_USER_DELETE_AVATAR = 'user/REPORT_USER_DELETE_AVATAR';
export const REPORT_ERROR = 'user/REPORT_ERROR';
export const EMMIT_ERROR = "'user/EMMIT_ERROR";

export const reportError = (error) => {
    return {
        type: REPORT_ERROR,
        payload: error,
    };
};

export const emmitError = (error) => {
    return {
        type: EMMIT_ERROR,
        payload: error,
    };
};

export const setUser = (user) => {
    return {
        type: USER_SET,
        payload: user
    };
};

export const clearUser = () => {
    return {
        type: USER_CLEAR
    };
};

export const registerUser = (user) => {
    return {
        type: USER_REGISTER,
        payload: user
    };
};

export const loginUser = (user) => {
    return {
        type: USER_LOGIN,
        payload: user
    };
};

export const logoutUser = () => {
    return {
        type: USER_LOGOUT
    };
};

export const fetchUser = () => {
    return {
        type: USER_FETCH
    };
};

export const editUser = (user) => {
    return {
        type: USER_EDIT,
        payload: user
    };
};

export const deleteUser = () => {
    return {
        type: USER_DELETE
    };
};

export const setAvatars = (avatars) => {
    return {
        type: SET_AVATARS,
        payload: avatars,
    };
};

export const unsetAvatars = () => {
    return {
        type: UNSET_AVATARS,
    };
};

export const setError = (error) => {
    return {
        type: USER_ERROR,
        payload: error
    };
};

export const clearError = () => {
    return {
        type: USER_CLEAR_ERROR
    };
};

export const reportUserRegister = () => {
    return {
        type: REPORT_USER_REGISTER
    };
};

export const reportUserLogin = () => {
    return {
        type: REPORT_USER_LOGIN
    };
};

export const reportUserLogout = () => {
    return {
        type: REPORT_USER_LOGOUT
    };
};

export const reportUserFetch = (user) => {
    return {
        type: REPORT_USER_FETCH,
        payload: user
    };
};

export const reportUserEdit = (user) => {
    return {
        type: REPORT_USER_EDIT,
        payload: user
    };
};

export const reportUserDelete = (user) => {
    return {
        type: REPORT_USER_DELETE,
        payload: user
    };
};

export const reportPushAvatar = (id) => {
    return {
        type: REPORT_USER_PUSH_AVATAR,
        payload: id
    };
};

export const reportDeleteAvatar = (id) => {
    return {
        type: REPORT_USER_DELETE_AVATAR,
        payload: id
    };
};