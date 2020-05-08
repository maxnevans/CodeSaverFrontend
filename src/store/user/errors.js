export const USER_REGISTER_ERROR = "USER_REGISTER_ERROR";
export const USER_LOGIN_ERROR = "USER_LOGIN_ERROR";
export const USER_LOGOUT_ERROR = "USER_LOGOUT_ERROR";
export const USER_FETCH_ERROR = "USER_FETCH_ERROR";
export const USER_EDIT_ERROR = "USER_EDIT_ERROR";
export const USER_DELETE_ERROR = "USER_DELETE_ERROR";
export const SET_AVATARS_ERROR = "PUSH_AVATAR_ERROR";
export const UNSET_AVATARS_ERROR = "DELETE_AVATAR_ERROR";

export const createUserRegisterError = (message = "Failed to register user!") => {
    return {
        type: USER_REGISTER_ERROR,
        message,
    };
};

export const createUserLoginError = (message = "Failed to login!") => {
    return {
        type: USER_LOGIN_ERROR,
        message,
    };
};

export const createUserLogoutError = (message = "Failed to logout!") => {
    return {
        type: USER_LOGOUT_ERROR,
        message,
    };
};

export const createUserFetchError = (message = "Failed to fetch user from database!") => {
    return {
        type: USER_FETCH_ERROR,
        message,
    };
};

export const createUserEditError = (message = "Failed to edit user in database!") => {
    return {
        type: USER_EDIT_ERROR,
        message
    };
};

export const createUserDeleteError = (message = "Failed to delete user in database!") => {
    return {
        type: USER_DELETE_ERROR,
        message
    };
};


export const createSetAvatarsError = (message = "Failed to set user avatars in database!") => {
    return {
        type: SET_AVATARS_ERROR,
        message
    };
};

export const createUnsetAvatarError = (message = "Failed to unset user avatars in database!") => {
    return {
        type: UNSET_AVATARS_ERROR,
        message
    };
};
