import clone from "lodash.clonedeep";
import {codeSampleReducer} from "./code-sample/reducers";
import { DELETE_CODE_SAMPLE, ADD_CODE_SAMPLE, SET_ERROR, CLEAR_ERROR, SET_CODE_SAMPLES } from "./actions";

const defaultState = {
    codeSamples: new Map(),
    error: null
};

export const codeSamplesListReducer = (state = defaultState, action) => {
    if (action?.type.startsWith("screens/mainScreen/codeSamplesList/codeSample/")) {
        const copy = clone(state);
        const codeSampleState = copy.codeSamples.get(action.codeSampleId);
        const codeSample = codeSampleReducer(codeSampleState, action);
        copy.codeSamples.set(action.codeSampleId, codeSample);
        return copy;
    }

    switch (action?.type) {
        case ADD_CODE_SAMPLE: {
            const copy = clone(state);
            copy.codeSamples.set(action.payload.id, action.payload);
            return copy;
        }
        case DELETE_CODE_SAMPLE: {
            const copy = clone(state);
            copy.codeSamples.delete(action.payload.id);
            return copy;
        }
        case SET_CODE_SAMPLES:
            return {...clone(state), codeSamples: new Map(action.payload)};
        case SET_ERROR:
            return {...clone(state), error: action.payload};
        case CLEAR_ERROR:
            return {...clone(state), error: defaultState.error};
    }

    return state;
};