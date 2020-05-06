export const SWITCH_TYPE = 'popups/auth/SWITCH_TYPE';
export const RESET = 'popups/auth/RESET';

export const switchType = (type) => {
    return {
        type: SWITCH_TYPE,
        payload: type
    };
};

export const reset = () => {
    return {
        type: RESET,
    };
};