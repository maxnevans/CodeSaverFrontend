import clone from "lodash.clonedeep";
import { SET_RETURN_VALUE, SET_DID_RETURN, CLEAR_DID_RETURN} from "./actions";
import { PUSH_POPUP } from "../actions";
import { CONFIRM_POPUP } from "../../../components/PopupTypes";

const defaultState = {
    popupType: CONFIRM_POPUP,
    returnValue: null,
    didReturn: false,
    options: null,
};

export const confirmReducer = (state = defaultState, action) => {
    switch (action?.type) {
        case PUSH_POPUP:
            return {...clone(state), options: action.payload};
        case SET_RETURN_VALUE:
            return {...clone(state), returnValue: action.payload};
        case SET_DID_RETURN:
            return {...clone(state), didReturn: true};
        case CLEAR_DID_RETURN:
            return {...clone(state), didReturn: defaultState.didReturn};
    }

    return state;
};