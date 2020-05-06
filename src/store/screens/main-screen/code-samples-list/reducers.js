import merge from "lodash.merge";
import {codeSampleReducer} from "./code-sample/reducers";
import { DELETE_CODE_SAMPLE, ADD_CODE_SAMPLE, SET_ERROR, CLEAR_ERROR, SET_CODE_SAMPLES } from "./actions";

const defaultState = {
    codeSamples: new Map(),
    error: null
};

export const codeSamplesListReducer = (state = defaultState, action) => {
    if (action?.type.startsWith("screens/mainScreen/codeSamplesList/codeSample/")) {
        return merge(state, {codeSamples: new Map(state.codeSamples).set(action.payload.id, codeSampleReducer(null, action.payload))});
    }

    switch(action?.type) {
        case ADD_CODE_SAMPLE: {
            let codeSamples = new Map(state);
            codeSamples.set(action.payload.id, action.payload);
            return merge(state, {codeSamples});
        }
        case DELETE_CODE_SAMPLE: {
            let codeSamples = new Map(state);
            codeSamples.delete(action.payload.id);
            return merge(state, {codeSamples});
        }
        case SET_CODE_SAMPLES:
            return merge(state, {codeSamples: new Map(action.payload)});
        case SET_ERROR:
            return merge(state, {error: action.payload});
        case CLEAR_ERROR:
            return merge(state, {error: defaultState.error});
    }

    return state;
};