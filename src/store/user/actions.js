export const USER_SET = 'user/PUT';
export const USER_CLEAR = 'user/CLEAR';
export const USER_REGISTER = 'user/REGISTER';
export const USER_LOGIN = 'user/LOGIN';
export const USER_LOGOUT = 'user/LOGOUT';
export const USER_ERROR = 'user/ERROR';
export const USER_CLEAR_ERROR = 'user/ERROR';


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

export const setError = (error) => {
    return {
        type: USER_ERROR,
        payload: error
    };
};

export const clearError = () => {
    return {
        type: USER_CLEAR_ERROR
    }
}