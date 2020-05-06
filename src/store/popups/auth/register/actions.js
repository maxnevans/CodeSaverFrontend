export const LOGIN_SET = 'popups/auth/register/LOGIN_SET';
export const PASSWORD_SET = 'popups/auth/register/PASSWORD_SET';
export const PASSWORD_REPEAT_SET = 'popups/auth/register/PASSWORD_REPEAT_SET';
export const SET_ERROR = 'popups/auth/register/SET_ERROR';
export const CLEAR_ERROR = 'popups/auth/register/SET_ERROR';
export const REGISTER_USER = 'popups/auth/register/REGISTER_USER';

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

export const setPasswordRepeat = (password) => {
    return {
        type: PASSWORD_REPEAT_SET,
        payload: password
    };
};

export const registerUser = (user) => {
    return {
        type: REGISTER_USER,
        payload: user
    }
};

export const setError = (error) => {
    return {
        type: SET_ERROR,
        payload: error
    }
};

export const clearError = () => {
    return {
        type: CLEAR_ERROR
    }
};