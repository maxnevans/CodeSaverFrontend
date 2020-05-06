import merge from "lodash.merge";
import {SET_DATA, SET_NAME, SET_CODE_SAMPLE, SAVE_CODE_SAMPLE, SET_ERROR, CLEAR_ERROR, CLEAR_DID_SAVE, CLEAR_DID_FETCH} from "./actions";

export const defaultState = {
    codeSample: {
        name: null,
        type: null,
        data: null,
        createdTime: null,
        editedTime: null,
    },
    error: null,
    didSave: false,
    didFetch: false,
};

export const codeSampleEditApiReducer = (state = defaultState, action) => {
    switch(action?.type) {
        case SET_NAME:
            return merge(state, {code: {name: action.payload}});
        case SET_DATA:
            return merge(state, {code: action.payload});
        case SET_CODE_SAMPLE:
            return merge(state, {code: action.payload});
        case SAVE_CODE_SAMPLE:
            return merge(state, {code: action.payload});
        case SET_ERROR:
            return merge(state, {error: action.payload});
        case CLEAR_ERROR:
            return merge(state, {error: defaultState.error});
        case CLEAR_DID_SAVE:
            return merge(state, {didSave: defaultState.didSave});
        case CLEAR_DID_FETCH:
            return merge(state, {didFetch: defaultState.didFetch});
        case CLEAR_DID_SAVE:
            return merge(state, {didSave: defaultState.didSave});
    }

    return state;
};