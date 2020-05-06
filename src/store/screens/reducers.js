import { POP_SCREEN, PUSH_SCREEN } from "./actions";
import { MAIN_SCREEN, EDIT_SCREEN } from "../../components/ScreenType";
import { mainScreenReducer } from "./main-screen/reducers";
import { editCodeSampleReducer } from "./edit-code-sample/reducers";
import merge from "lodash.merge";

const defaultState = {
    stack: []
};

const createScreenState = (type) => {
    switch(type) {
        case MAIN_SCREEN:
            return mainScreenReducer();
        case EDIT_SCREEN:
            return editCodeSampleReducer();
    }
};

export const screensReducer = (state = defaultState, action) => {
    switch(action?.type) {
        case PUSH_SCREEN: {
            const stack = state.stack.slice();
            stack.push(createScreenState(action.payload));
            return merge(state, {stack});
        }
        case POP_SCREEN: {
            const stack = state.stack.slice();
            stack.pop();
            return merge(state, {stack});
        }
    }

    return state;
};