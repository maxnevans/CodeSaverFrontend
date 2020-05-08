import { registerUser as mainRegisterUser } from "../../../user/actions";
import {all, select, put, takeEvery, call} from "redux-saga/effects";
import { setError, REGISTER_USER } from "./actions";
import { createUserExists } from "./errors";

const getUserError = (state) => state.user.error;

function* registerUser(action) {
    yield put(mainRegisterUser(action));
    const error = yield select(getUserError);
    if (error != null)
        put(setError(createUserExists()));
}

function* registerUserWatcher() {
    yield takeEvery(REGISTER_USER, registerUser);
}

export default function* rootSaga() {
    yield all([
        call(registerUserWatcher)
    ]);
}