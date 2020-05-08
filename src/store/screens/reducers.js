import { POP_SCREEN, PUSH_SCREEN } from "./actions";
import { MAIN_SCREEN, EDIT_SCREEN, USER_PROFILE_SCREEN } from "../../components/ScreenType";
import { mainScreenReducer } from "./main-screen/reducers";
import { editCodeSampleReducer } from "./edit-code-sample/reducers";
import clone from "lodash.clonedeep";
import { userProfileReducer } from "./user-profile/reducers";

const defaultState = {
    stack: [
        mainScreenReducer(),
    ]
};

const createScreenState = (type) => {
    switch (type) {
        case MAIN_SCREEN:
            return mainScreenReducer();
        case EDIT_SCREEN:
            return editCodeSampleReducer();
        case USER_PROFILE_SCREEN:
            return userProfileReducer();
    }

    throw new Error("Unregistered screen type!");
};

const topStackScreenReducer = (state, action) => {
    if (state.stack.length == 0)
        throw new Error("Failed to call top screen reducer! No screens in stack!");

    const screenState = state.stack[state.stack.length - 1];
    const type = screenState.screenType;

    switch (type) {
        case MAIN_SCREEN:
            return mainScreenReducer(screenState, action);
        case EDIT_SCREEN:
            return editCodeSampleReducer(screenState, action);
        case USER_PROFILE_SCREEN:
            return userProfileReducer(screenState, action);
    }

    throw new Error("Unregistered screen type!");
};

export const screensReducer = (state = defaultState, action) => {
    switch (action?.type) {
        case PUSH_SCREEN: {
            const copy = clone(state);
            copy.stack.push(createScreenState(action.payload));
            return copy;
        }
        case POP_SCREEN: {
            const copy = clone(state);
            copy.stack.pop();
            return copy;
        }
    }

    /* Provide messages to screens */
    if (action?.type.startsWith("screens/")) {
        const topScreenState = topStackScreenReducer(state, action);
        const copy = clone(state);
        copy.stack[state.stack.length - 1] = topScreenState;
        return copy;
    }

    return state;
};