import {all, call} from "redux-saga/effects";
import rootMainScreen from "./main-screen/sagas";
import rootCommon from "./common/sagas";
import rootUserProfile from "./user-profile/sagas";

export default function* () {
    yield all([
        call(rootMainScreen),
        call(rootCommon),
        call(rootUserProfile),
    ]);
}