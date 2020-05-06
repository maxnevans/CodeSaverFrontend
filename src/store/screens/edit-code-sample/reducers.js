import {combineReducers} from "redux";
import { codeSampleEditReducer } from "../common/code-sample-edit/reducers";
import { EDIT_SCREEN } from "../../../components/ScreenType";

export const editCodeSampleReducer = combineReducers({
    screenType: () => EDIT_SCREEN,
    codeSampleEdit: codeSampleEditReducer
});