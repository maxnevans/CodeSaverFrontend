import clone from "lodash.clonedeep";
import {SET_DATA, SET_NAME, SET_CODE_SAMPLE, SET_ERROR, 
    CLEAR_ERROR, CLEAR_DID_SAVE, CLEAR_DID_FETCH, SET_DID_SAVE, SET_DID_DELETE, 
    SET_DID_FETCH, CLEAR_DID_DELETE, CLEAR_CODE_SAMPLE} from "./actions";

const defaultState = {
    codeSample: {
        name: null,
        type: null,
        data: null,
        createdTime: null,
        editedTime: null,
        author: null,
        mods: null
    },
    error: null,
    didSave: false,
    didFetch: false,
};

export const codeSampleEditApiReducer = (state = defaultState, action) => {
    switch (action?.type) {
        case SET_NAME:
            return {...clone(state), codeSample: {name: action.payload}};
        case SET_DATA:
            return {...clone(state), codeSample: action.payload};
        case CLEAR_CODE_SAMPLE:
            return {...clone(state), codeSample:defaultState.codeSample};
        case SET_CODE_SAMPLE:
            return {...clone(state), codeSample: action.payload};
        case SET_ERROR:
            return {...clone(state), error: action.payload};
        case CLEAR_ERROR:
            return {...clone(state), error: defaultState.error};
        case SET_DID_SAVE:
            return {...clone(state), didSave: true};
        case SET_DID_FETCH:
            return {...clone(state), didFetch: true};
        case SET_DID_DELETE:
            return {...clone(state), didDelete: true};
        case CLEAR_DID_SAVE:
            return {...clone(state), didSave: defaultState.didSave};
        case CLEAR_DID_FETCH:
            return {...clone(state), didFetch: defaultState.didFetch};
        case CLEAR_DID_DELETE:
            return {...clone(state), didDelete: defaultState.didDelete};
    }

    return state;
};