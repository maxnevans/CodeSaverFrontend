import clone from "lodash.clonedeep";
import { SET_OLD_PASSWORD, SET_PASSWORD, SET_PASSWORD_REPEAT, SET_DID_FETCH, 
    CLEAR_DID_FETCH, SET_OLD_PASSWORD_API, CLEAR_DID_CHANGE, SET_DID_CHANGE,
    SET_ERROR, CLEAR_ERROR} from "./actions";
import { PUSH_POPUP } from "../actions";
import { PASSWORD_CHANGE_POPUP } from "../../../components/PopupTypes";

const defaultState = {
    popupType: PASSWORD_CHANGE_POPUP,
    oldPasswordApi: null,
    didFetch: false,
    didChange: false,
    oldPassword: '',
    password: '',
    passwordRepeat: '',
    options: null,
    error: null
};

export const passwordChangeReducer = (state = defaultState, action) => {
    switch (action?.type) {
        case PUSH_POPUP:
            return {...clone(state), options: action.payload};
        case SET_OLD_PASSWORD:
            return {...clone(state), oldPassword: action.payload};
        case SET_OLD_PASSWORD_API:
            return {...clone(state), oldPasswordApi: action.payload};
        case SET_PASSWORD:
            return {...clone(state), password: action.payload};
        case SET_PASSWORD_REPEAT:
            return {...clone(state), passwordRepeat: action.payload};
        case SET_DID_FETCH:
            return {...clone(state), didFetch: true};
        case CLEAR_DID_FETCH:
            return {...clone(state), didFetch: defaultState.didFetch};
        case SET_DID_CHANGE:
            return {...clone(state), didChange: true};
        case CLEAR_DID_CHANGE:
            return {...clone(state), didChange: defaultState.didChange};
        case SET_ERROR: {
            const copy = clone(state);
            if (copy.error == null) 
                copy.error = [];
            copy.error.push(action.payload);
            return copy;
        }
        case CLEAR_ERROR:
            return {...clone(state), error: defaultState.error};
    }

    return state;
};