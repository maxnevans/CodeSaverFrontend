import { SET_ERROR, CLEAR_ERROR } from "./actions";
import clone from "lodash.clonedeep";

const defaultState = {
    codeSample: {
        id: null,
        name: null,
        type: null,
        editedTime: null,
        createdTime: null,
        author: null,
        mods: null
    },
    error: null
};

export const codeSampleReducer = (state = defaultState, action) => {
    switch (action?.type) {
        case SET_ERROR:
            return {...clone(state), error: action.payload};
        case CLEAR_ERROR:
            return {...clone(state), error: defaultState.error};
    }

    return state;
};