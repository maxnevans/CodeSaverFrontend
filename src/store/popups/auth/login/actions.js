export const LOGIN_SET = "popups/auth/login/LOGIN_SET";
export const PASSWORD_SET = "popups/auth/login/PASSWORD_SET";
export const LOGIN_USER = "popups/auth/login/LOGIN_USER";
export const LOGIN_USER_FAILED = "popups/auth/login/LOGIN_USER_FAILED";

export const loginUser = (user) => {
    return {
        type: LOGIN_USER,
        payload: user
    };
};

export const setLogin = (login) => {
    return {
        type: LOGIN_SET,
        payload: login
    };
};

export const setPassword = (password) => {
    return {
        type: PASSWORD_SET,
        payload: password
    };
};