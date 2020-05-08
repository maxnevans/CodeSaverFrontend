import {PUSH_POPUP, POP_POPUP} from "./actions";
import { AUTH_POPUP, CONFIRM_POPUP, PASSWORD_CHANGE_POPUP } from "../../components/PopupTypes";
import { authReducer } from "./auth/reducers";
import clone from "lodash.clonedeep";
import { confirmReducer } from "./confirm/reducers";
import { passwordChangeReducer } from "./password-change/reducers";

const defaultState = {
    stack: []
};

const createPopupState = (action) => {
    switch (action?.popupType) {
        case AUTH_POPUP:
            return authReducer(undefined, action);
        case CONFIRM_POPUP:
            return confirmReducer(undefined, action);
        case PASSWORD_CHANGE_POPUP:
            return passwordChangeReducer(undefined, action);
    }
    throw new Error("Push unregistered popup in reducer!");
};

const topStackPopupReducer = (state, action) => {
    if (state.stack.length == 0)
        throw new Error("Failed to call top popup reducer! No popups in stack!");

    const popupState = state.stack[state.stack.length - 1];
    const type = popupState.popupType;

    switch (type) {
        case AUTH_POPUP:
            return authReducer(popupState, action);
        case CONFIRM_POPUP:
            return confirmReducer(popupState, action);
        case PASSWORD_CHANGE_POPUP:
            return passwordChangeReducer(popupState, action);
    }

    throw new Error("Unregistered popup type!");
};


export const popupsReducer = (state = defaultState, action) => {
    switch (action?.type) {
        case PUSH_POPUP: {
            const copy = clone(state);
            copy.stack.push(createPopupState(action));
            return copy;
        }
        case POP_POPUP: {
            const copy = clone(state);
            copy.stack.pop();
            return copy;
        }
    }

    /* Provide messages to popup */
    if (action?.type.startsWith("popups/")) {
        const topPopupState = topStackPopupReducer(state, action);
        const copy = clone(state);
        copy.stack[state.stack.length - 1] = topPopupState;
        return copy;
    }

    return state;
};