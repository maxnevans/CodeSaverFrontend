import cloneDeep from "lodash.clonedeep";
import {SET_ERROR, CLEAR_ERROR, CLEAR_DID_SAVE, CLEAR_DID_FETCH, SET_DID_SAVE, SET_DID_DELETE, 
    SET_DID_FETCH, CLEAR_DID_DELETE, SET_DID_UPLOAD_AVATAR, CLEAR_DID_UPLOAD_AVATAR} from "./actions";

const defaultState = {
    error: null,
    didSave: false,
    didDelete: false,
    didFetch: false,
    didUploadAvatar: false,
};

export const userProfileApiReducer = (state = defaultState, action) => {
    switch (action?.type) {
        case SET_ERROR:
            return {...cloneDeep(state), error: action.payload};
        case CLEAR_ERROR:
            return {...cloneDeep(state), error: defaultState.error};
        case SET_DID_SAVE:
            return {...cloneDeep(state), didSave: true};
        case SET_DID_FETCH:
            return {...cloneDeep(state), didFetch: true};
        case SET_DID_DELETE:
            return {...cloneDeep(state), didDelete: true};
        case SET_DID_UPLOAD_AVATAR:
            return {...cloneDeep(state), didUploadAvatar: true};
        case CLEAR_DID_SAVE:
            return {...cloneDeep(state), didSave: defaultState.didSave};
        case CLEAR_DID_FETCH:
            return {...cloneDeep(state), didFetch: defaultState.didFetch};
        case CLEAR_DID_DELETE:
            return {...cloneDeep(state), didDelete: defaultState.didDelete};
        case CLEAR_DID_UPLOAD_AVATAR:
            return {...cloneDeep(state), didUploadAvatar: defaultState.didUploadAvatar};
    }
    return state;
};