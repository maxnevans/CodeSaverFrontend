export const PASSWORDS_MISMATCH = "PASSWORDS_MISMATCH";
export const PASSWORD_IS_OLD = "PASSWORD_IS_OLD";
export const OLD_PASSWORD_IS_WRONG = "OLD_PASSWORD_IS_WRONG";
export const FETCH_ERROR = "FETCH_ERROR";
export const PASSWORD_CHANGE_ERROR = "PASSWORD_CHANGE_ERROR";
export const PASSWORD_IS_SHORT = "PASSWORD_IS_SHORT";

export const createPasswordsMismatchError = (message = "Passwords mismatch!") => {
    return {
        type: PASSWORDS_MISMATCH,
        message
    };
};

export const createPasswordIsOld = (message = "Passwords is old!") => {
    return {
        type: PASSWORD_IS_OLD,
        message
    };
};

export const createFetchError = (message = " Failed to fetch password from database!") => {
    return {
        type: FETCH_ERROR,
        message
    };
};

export const createOldPasswordIsWrong = (message = "Old password is wrong!") => {
    return {
        type: OLD_PASSWORD_IS_WRONG,
        message
    };
};


export const createPasswordChangeError = (message = "Failed to change password!") => {
    return {
        type: PASSWORD_CHANGE_ERROR,
        message
    };
};

export const createPasswordTooShort = (message = "Password is too short!") => {
    return {
        type: PASSWORD_IS_SHORT,
        message
    };
};