import { loginReducer } from "./login/reducers";
import { registerReducer } from "./register/reducers";
import { SWITCH_TYPE } from "./actions";
import AuthPopup from "../../../components/popups/Auth";
import { AUTH_POPUP } from "../../../components/PopupTypes";
import merge from "lodash.merge";

const defaultState = {
    popupType: AUTH_POPUP,
    authEditing: loginReducer(),
    authType: AuthPopup.LOGIN
};

const createTypeState = (type) => {
    switch(type) {
        case AuthPopup.LOGIN:
            return loginReducer();
        case AuthPopup.REGISTER:
            return registerReducer();
    } 

    throw new Error("Undefined auth type!");
};

export const authReducer = (state = defaultState, action) => {
    if (action?.type.startsWith('popup/auth/login/'))
        return merge(state, {authEditing: loginReducer(state, action)});

    if (action?.type.startsWith('popup/auth/register/'))
        return merge(state, {authEditing: registerReducer(state, action)});

    switch(action?.type) {
        case SWITCH_TYPE:
            return merge(state, {authType: action.payload, authEditing: createTypeState(action.payload)});
        case RESET:
            return merge(state, defaultState);
    }
    return state;
};