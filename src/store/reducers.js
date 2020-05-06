import { combineReducers } from 'redux';
import {userReducer} from './user/reducers';
import {screensReducer} from "./screens/reducers"
import {popupsReducer} from "./popups/reducers"

export default combineReducers({
    popups: popupsReducer,
    screens: screensReducer,
    user: userReducer,
});