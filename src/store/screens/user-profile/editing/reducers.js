import { SET_NAME, SET_SECOND_NAME, SET_LOGIN, SET_PASSWORD, SET_PASSWORD_REPEAT, SET_AVATARS, DELETE_AVATARS, CLEAR_USER, SET_USER } from "./actions";
import cloneDeep from "lodash.clonedeep";

const defaultState = {
    name: '',
    secondName: '',
    login: '',
    password: '',
    passwordRepeat: '',
    avatars: null
};

export const userProfileEditingReducer = (state = defaultState, action) => {
    switch (action?.type) {
        case SET_NAME: {
            const copy = cloneDeep(state);
            copy.name = action.payload;
            return copy;
        }
        case SET_SECOND_NAME: {
            const copy = cloneDeep(state);
            copy.secondName = action.payload;
            return copy;
        }
        case SET_LOGIN: {
            const copy = cloneDeep(state);
            copy.login = action.payload;
            return copy;
        }
        case SET_PASSWORD: {
            const copy = cloneDeep(state);
            copy.password = action.payload;
            return copy;
        }
        case SET_PASSWORD_REPEAT: {
            const copy = cloneDeep(state);
            copy.passwordRepeat = action.payload;
            return copy;
        }
        case SET_AVATARS: {
            const copy = cloneDeep(state);
            copy.avatars = action.payload;
            return copy;
        }
        case DELETE_AVATARS: {
            const copy = cloneDeep(state);
            copy.avatars = defaultState.avatars;
            return copy;
        }
        case CLEAR_USER: {
            return cloneDeep(defaultState);
        }
        case SET_USER: {
            return cloneDeep(action.payload);
        }
    }

    return state;
};