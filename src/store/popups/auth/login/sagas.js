import {LOGIN_USER} from "./actions";
import {loginUser as mainLoginUser} from "../../../user/actions";
import {all, put, takeEvery, call} from "redux-saga/effects";

function* loginUser(action) {
    yield put(mainLoginUser(action.payload));
}

function* loginUserWatcher() {
    yield takeEvery(LOGIN_USER, loginUser);
}

export default function* rootSaga() {
    yield all([
        call(loginUserWatcher)
    ]);
}