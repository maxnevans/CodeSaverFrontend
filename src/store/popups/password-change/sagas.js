import {takeLeading, all, call, put, select} from "redux-saga/effects";
import {CHANGE_PASSWORD, FETCH_PASSWORD, setError, setOldPasswordApi, setDidFetch, setDidChange} from "./actions";
import { forceAuthenticationMiddleware } from "../../sagas";
import API from "../../../core/api";
import { createFetchError, createOldPasswordIsWrong, 
    createPasswordIsOld, createPasswordsMismatchError,
    createPasswordChangeError, createPasswordTooShort } from "./errors";
import { popPopup } from "../actions";

const getOldPasswordApi = state => {
    const popupState = state.popups.stack[state.popups.stack.length - 1];
    return popupState.oldPasswordApi;
};


function* passwordChangeWorker(action) {
    const oldPasswordApi = yield select(getOldPasswordApi);

    let error = false;

    if (oldPasswordApi != action.payload.oldPassword) {
        yield put(setError(createOldPasswordIsWrong()));
        error = true;
    }

    if (action.payload.oldPassword == action.payload.password || action.payload.oldPassword == action.payload.passwordRepeat) {
        yield put(setError(createPasswordIsOld()));
        error = true;
    }

    if (action.payload.password != action.payload.passwordRepeat) {
        yield put(setError(createPasswordsMismatchError()));
        error = true;
    }

    const minPassLength = 5;
    if (action.payload.password.length < minPassLength) {
        yield put(setError(createPasswordTooShort(`Password is too short! Should be ${minPassLength} characters minimum!`)));
        error = true;
    }

    if (error) return;

    const success = yield call(API.editUserPassword, action.payload.password);

    if (!success)
        return yield put(setError(createPasswordChangeError()));

    yield put(setDidChange());
    yield put(popPopup());
}

function* passwordChangeWatcher() {
    yield takeLeading(CHANGE_PASSWORD, forceAuthenticationMiddleware, passwordChangeWorker);
}

function* fetchPasswordWorker() {
    const password = yield call(API.fetchUserPassword);

    if (password == null)
        return yield put(setError(createFetchError));

    yield put(setOldPasswordApi(password));
    yield put(setDidFetch());
}

function* fetchPasswordWatcher() {
    yield takeLeading(FETCH_PASSWORD, forceAuthenticationMiddleware, fetchPasswordWorker);
}

export default function* () {
    yield all([
        call(passwordChangeWatcher),
        call(fetchPasswordWatcher)
    ]);
}