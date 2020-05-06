import { USER_SET, USER_ERROR, USER_CLEAR, USER_CLEAR_ERROR } from "./actions";
import merge from "lodash.merge";

const defaultState = {
    user: null,
    error: null
};

export const userReducer = (state = defaultState, action) => {
    switch(action?.type) {
        case USER_SET:
            return merge(state, {user: action.payload});
        case USER_CLEAR:
            return merge(state, {user: defaultState.user});
        case USER_ERROR:
            return merge(state, {error: action.payload});
        case USER_CLEAR_ERROR:
            return merge(state, {error: defaultState.error});
    }

    return state;
};