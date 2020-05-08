import { SET_NAME, SET_DATA, SET_CODE_SAMPLE, CLEAR_CODE_SAMPLE, UPDATE_MODS } from "./actions";
import DataSource from "../../../../../components/screens/code-sample/editor-data/DataSource";
import cloneDeep from "lodash.clonedeep";
import merge from "lodash.merge";

const defaultState = {
    name: '',
    type: DataSource.SOURCE_TEXT,
    data: '',
    author: null,
    mods: {
        isReadPrivate: false,
        isWritePrivate: true,
    }
};

export const codeSampleEditEditingReducer = (state = defaultState, action) => {
    switch (action?.type) {
        case SET_NAME:
            return {...cloneDeep(state), name: action.payload};
        case SET_DATA:
            return {...cloneDeep(state), ...action.payload};
        case SET_CODE_SAMPLE:
            return {...cloneDeep(state), ...action.payload};
        case CLEAR_CODE_SAMPLE:
            return cloneDeep(defaultState);
        case UPDATE_MODS: {
            const copy = cloneDeep(state);
            merge(copy.mods, action.payload);
            return copy;
        }
    }

    return state;
};