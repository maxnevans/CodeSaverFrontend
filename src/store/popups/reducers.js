import {PUSH_POPUP, POP_POPUP} from "./actions";
import { AUTH_POPUP } from "../../components/PopupTypes";
import { authReducer } from "./auth/reducers";
import merge from "lodash.merge";

const defaultState = {
    stack: []
};

const createPopupState = (type) => {
    switch(action?.payload) {
        case AUTH_POPUP:
            return merge({}, authReducer());
    }
    throw new Error("Push unregistered popup in reducer!");
}

export const popupsReducer = (state = defaultState, action) => {
    switch(action?.type) {
        case PUSH_POPUP: {
            const stack = state.stack.slice();
            stack.push(createPopupState(action.payload));
            return merge(state, {stack});
        }
        case POP_POPUP:{
            const stack= state.stack.slice();
            stack.pop();
            return merge(state, {stack});
        }
    }
    return state;
};