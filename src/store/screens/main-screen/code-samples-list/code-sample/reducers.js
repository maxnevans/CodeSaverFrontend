import { DELETE, DELETE_FAILED, EDIT_FAILED } from "./actions";

const defaultState = {
    codeSample: {
        name: null,
        type: null,
        editedTime: null,
        createdTime: null,
    },
    error: null
};

export const codeSampleReducer = (state = defaultState, action) => {
    switch (action?.type) {
        case EDIT_FAILED:
            return merge(state, {error: action.payload});
        case DELETE_FAILED:
            return merge(state, {errors: action.payload});
    }

    return state;
};