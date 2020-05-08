import { loginReducer } from "./login/reducers";
import { registerReducer } from "./register/reducers";
import { SWITCH_TYPE, RESET } from "./actions";
import AuthPopup from "../../../components/popups/Auth";
import { AUTH_POPUP } from "../../../components/PopupTypes";
import clone from "lodash.clonedeep";
import { PUSH_POPUP } from "../actions";

const defaultState = {
    popupType: AUTH_POPUP,
    authEditing: loginReducer(),
    authType: AuthPopup.LOGIN,
    options: null
};

const createTypeState = (type) => {
    switch (type) {
        case AuthPopup.LOGIN:
            return loginReducer();
        case AuthPopup.REGISTER:
            return registerReducer();
    } 

    throw new Error("Undefined auth type!");
};

const particularAuthReducer = (state, action) => {
    switch (state.authType) {
        case AuthPopup.LOGIN:
            return loginReducer(state.authEditing, action);
        case AuthPopup.REGISTER:
            return registerReducer(state.authEditing, action);
    }
    throw new Error("Unregistered auth type!");
};

export const authReducer = (state = defaultState, action) => {
    switch (action?.type) {
        case PUSH_POPUP:
            return {...clone(state), options: action.payload};
        case SWITCH_TYPE:
            return {...clone(state), authType: action.payload, authEditing: createTypeState(action.payload)};
        case RESET:
            return defaultState;
    }

    /* Provide messages to auth submodules */
    if (action?.type.startsWith("popups/auth/")) {
        return {...clone(state), authEditing: particularAuthReducer(state, action)};
    }

    return state;
};