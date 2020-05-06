import {LOGIN_SET, PASSWORD_SET, LOGIN_USER_FAILED} from "./actions";

const defaultState = {
    login: '',
    password: '',
    error: null
};

export const loginReducer = (state = defaultState, action) => {
    switch(action?.type) {
        case LOGIN_SET:
            return {...state, login: action.payload};
        case PASSWORD_SET:
            return {...state, password: action.payload};
        case LOGIN_USER_FAILED:
            return {...state, error: action.payload};
    }
    return state;
};