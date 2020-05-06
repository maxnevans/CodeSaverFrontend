import { combineReducers } from "redux";
import { codeSamplesListReducer } from "./code-samples-list/reducers";
import { codeSampleEditReducer } from "../common/code-sample-edit/reducers"
import { MAIN_SCREEN } from "../../../components/ScreenType";

export const mainScreenReducer = combineReducers({
    screenType: () => MAIN_SCREEN,
    newCodeSample: codeSampleEditReducer,
    codeSamplesList: codeSamplesListReducer,
});