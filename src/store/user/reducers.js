import { USER_SET, USER_ERROR, USER_CLEAR, USER_CLEAR_ERROR } from "./actions";
import cloneDeep from "lodash.clonedeep";

const defaultState = {
    user: null,
    error: null
};

export const userReducer = (state = defaultState, action) => {
    switch (action?.type) {
        case USER_SET: {
            const copy = cloneDeep(state);
            copy.user = action.payload;
            return copy;
        }
        case USER_CLEAR: {
            const copy = cloneDeep(state);
            copy.user = defaultState.user;
            return copy;
        }
        case USER_ERROR: {
            const copy = cloneDeep(state);
            copy.error = action.payload;
            return copy;
        }
        case USER_CLEAR_ERROR: {
            const copy = cloneDeep(state);
            copy.error = cloneDeep(defaultState.error);   
            return copy;
        }
    }

    return state;
};