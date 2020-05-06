import {combineReducers} from "redux";
import {codeSampleEditApiReducer} from "./api/reducers";
import {codeSampleEditEditingReducer} from "./editing/reducers";

export const codeSampleEditReducer = combineReducers({
    api: codeSampleEditApiReducer,
    editing: codeSampleEditEditingReducer
});