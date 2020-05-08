import {LOGIN_SET, PASSWORD_SET, PASSWORD_REPEAT_SET, SET_ERROR, CLEAR_ERROR } from "./actions";

const defaultState = {
    login: '',
    password: '',
    passwordRepeat: '',
    error: null,
};

export const registerReducer = (state = defaultState, action) => {
    switch (action?.type) {
        case LOGIN_SET: 
            return {...state, login: action.payload};
        case PASSWORD_SET: 
            return {...state, password: action.payload};
        case PASSWORD_REPEAT_SET:
            return {...state, passwordRepeat: action.payload};
        case SET_ERROR:
            return {...state, error: action.payload};
        case CLEAR_ERROR:
            return {...state, error: defaultState.error};
    }

    return state;
};