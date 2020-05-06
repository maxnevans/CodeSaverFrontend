import { EDITING_SET_NAME, EDITING_SET_DATA, EDITING_SET_CODE_SAMPLE } from "./actions";
import {DATA_TYPE_TEXT} from "../actions";

const defaultState = {
    name: '',
    type: DATA_TYPE_TEXT,
    data: '',
};

export const codeSampleEditEditingReducer = (state = defaultState, action) => {
    switch(action?.type) {
        case EDITING_SET_NAME:
            return {...state, name: action.payload};
        case EDITING_SET_DATA:
            return {...state, ...action.payload};
        case EDITING_SET_CODE_SAMPLE:
            return {...state, ...action.payload};
    }

    return state;
};