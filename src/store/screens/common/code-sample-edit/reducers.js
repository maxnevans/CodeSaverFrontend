import {codeSampleEditApiReducer} from "./api/reducers";
import {codeSampleEditEditingReducer} from "./editing/reducers";
import { CLEAR_CODE_SAMPLE } from "./actions";
import cloneDeep from "lodash.clonedeep";

const defaultState = {
    api: codeSampleEditApiReducer(),
    editing: codeSampleEditEditingReducer(),
};

export const codeSampleEditReducer = (state = defaultState, action) => {
    switch (action?.type) {
        case CLEAR_CODE_SAMPLE:
            return cloneDeep(defaultState);
    }

    if (action?.type.startsWith("screens/common/codeSampleEdit/api/")) {
        const copy = cloneDeep(state);
        copy.api = codeSampleEditApiReducer(state.api, action);
        return copy;
    }

    if (action?.type.startsWith("screens/common/codeSampleEdit/editing/")) {
        const copy = cloneDeep(state);
        copy.editing = codeSampleEditEditingReducer(state.editing, action);
        return copy;
    }

    return state;
};