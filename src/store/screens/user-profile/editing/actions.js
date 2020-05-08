export const SET_NAME = "screens/userProfile/editing/SET_NAME";
export const SET_SECOND_NAME = "screens/userProfile/editing/SET_SECOND_NAME";
export const SET_PASSWORD = "screens/userProfile/editing/SET_PASSWORD";
export const SET_PASSWORD_REPEAT = "screens/userProfile/editing/SET_PASSWORD_REPEAT";
export const SET_LOGIN = "screens/userProfile/editing/SET_LOGIN";
export const SET_AVATARS = "screens/userProfile/editing/SET_AVATARS";
export const DELETE_AVATARS = "screens/userProfile/editing/DELETE_AVATARS";
export const SET_USER = "screens/userProfile/editing/SET_USER";
export const CLEAR_USER = "screens/userProfile/editing/CLEAR_USER";
export const CHANGE_PASSWORD = "screens/userProfile/editing/CHANGE_PASSWORD";

export const setName = (name) => {
    return {
        type: SET_NAME,
        payload: name
    };
};

export const setSecondName = (name) => {
    return {
        type: SET_SECOND_NAME,
        payload: name
    };
};

export const setPassword = (password) => {
    return {
        type: SET_PASSWORD,
        payload: password
    };
};

export const setPasswordRepeat = (password) => {
    return {
        type: SET_PASSWORD_REPEAT,
        payload: password
    };
};

export const setLogin = (login) => {
    return {
        type: SET_LOGIN,
        payload: login
    };
};


export const setAvatars = (avatars) => {
    return {
        type: SET_AVATARS,
        payload: avatars
    };
};

export const deleteAvatars = () => {
    return {
        type: DELETE_AVATARS
    };
};

export const setUser = (user) => {
    return {
        type: SET_USER,
        payload: user
    };
};

export const clearUser = () => {
    return {
        type: CLEAR_USER
    };
};

export const changePassword = () => {
    return {
        type: CHANGE_PASSWORD,
    };
};