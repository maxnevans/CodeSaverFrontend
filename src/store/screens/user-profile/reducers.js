import cloneDeep from "lodash.clonedeep";
import {userProfileApiReducer} from "./api/reducers";
import {userProfileEditingReducer} from "./editing/reducers";
import { USER_PROFILE_SCREEN } from "../../../components/ScreenType";

const defaultState = {
    screenType: USER_PROFILE_SCREEN,
    api: userProfileApiReducer(),
    editing: userProfileEditingReducer(),
};

export const userProfileReducer = (state = defaultState, action) => {

    if (action?.type.startsWith("screens/userProfile/api/")) {
        const copy = cloneDeep(state);
        copy.api = userProfileApiReducer(state.api, action);
        return copy;
    }

    if (action?.type.startsWith("screens/userProfile/editing/")) {
        const copy = cloneDeep(state);
        copy.editing = userProfileEditingReducer(state.editing, action);
        return copy;
    }

    return state;
};