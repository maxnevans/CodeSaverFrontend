import {userReducer} from './user/reducers';
import {screensReducer} from "./screens/reducers";
import {popupsReducer} from "./popups/reducers";
import assign from "lodash.assign";
import { CLEAR_APP } from './actions';


const defaultState = {
    popups: popupsReducer(),
    screens: screensReducer(),
    user: userReducer(),
};

const routes = {
    popups: popupsReducer,
    screens: screensReducer,
    user: userReducer,
};

const route = (submoduleName, state, action) => {
    return assign({}, state, {[submoduleName]: routes[submoduleName](state[submoduleName], action)});
};

export default (state = defaultState, action) => {
    switch (action?.type) {
        case CLEAR_APP:
            return defaultState;
    }

    const submoduleName = action?.type.split("/")[0];
    if (Object.getOwnPropertyNames(routes).includes(submoduleName)) {
        return route(submoduleName, state, action);
    }

    return state;
};