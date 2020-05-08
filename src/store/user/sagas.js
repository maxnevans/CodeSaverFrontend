import {takeEvery, put, call, all, takeLeading, take } from "redux-saga/effects";
import { USER_LOGIN, USER_LOGOUT, USER_REGISTER, USER_FETCH, 
    setUser, reportUserLogin, reportUserRegister, 
    reportUserLogout, emmitError, clearUser, reportUserFetch, reportUserEdit, 
    reportUserDelete, USER_EDIT, USER_DELETE, SET_AVATARS, reportPushAvatar, 
    UNSET_AVATARS, reportDeleteAvatar, EMMIT_ERROR, setError } from "./actions";
import API from "../../core/api";
import { createUserRegisterError, createUserLogoutError, createUserLoginError, 
    createUserFetchError, createUserEditError, createUserDeleteError,
    createSetAvatarsError, createUnsetAvatarError } from "./errors";
import { resetApp, REPORT_RESET_APP, requireAuthentication } from "../actions";
import { reportError } from "../screens/main-screen/code-samples-list/actions";


export function* emmitErrorWorker(action) {
    console.log(action);
    yield put(setError(action.payload));
    yield put(reportError(action.payload));
}

export function* emmitErrorWatcher() {
    yield takeEvery(EMMIT_ERROR, emmitErrorWorker);
}

export function* userRegister(action) {
    const user = yield call(API.registerUser, action.payload);
    if (user == null)
        return put(emmitError(createUserRegisterError()));

    yield put(setUser(user));
    yield put(reportUserRegister());
}

function* userRegisterWatcher() {
    yield takeEvery(USER_REGISTER, userRegister);
}

export function* userLogout() {
    const success = yield call(API.logoutUser);
    if (!success) 
        return put(emmitError(createUserLogoutError()));

    yield put(resetApp());
    yield take(REPORT_RESET_APP);

    yield put(requireAuthentication());

    yield put(reportUserLogout());
}

function* userLogoutWatcher() {
    yield takeEvery(USER_LOGOUT, userLogout);
}

function* userLogin(action) {
    const user = yield call(API.loginUser, action.payload);
    if (user == null)
        return put(emmitError(createUserLoginError()));

    yield put(setUser(user));
    yield put(reportUserLogin());
}

function* userLoginWatcher() {
    yield takeLeading(USER_LOGIN, userLogin);
}

function* userFetch() {
    const user = yield call(API.getUser);
    if (user == null)
        return put(emmitError(createUserFetchError()));

    yield put(setUser(user));
    yield put(reportUserFetch(user));
}

function* userFetchWatcher() {
    yield takeLeading(USER_FETCH, userFetch);
}

function* userEdit(action) {
    const user = yield call(API.editUser, action.payload);
    if (user == null)
        return put(emmitError(createUserEditError()));

    yield put(setUser(user));
    yield put(reportUserEdit(user));
}

function* userEditWatcher() {
    yield takeLeading(USER_EDIT, userEdit);
}

function* userDelete(action) {
    const success = yield call(API.deleteUser, action.payload);
    if (!success)
        return put(emmitError(createUserDeleteError()));

    yield put(clearUser());
    yield put(reportUserDelete());
}

function* userDeleteWatcher() {
    yield takeLeading(USER_DELETE, userDelete);
}

function* setAvatarsWorker(action) {
    const success = yield call(API.setUserAvatars, action.payload);

    if (!success)
        return put(emmitError(createSetAvatarsError()));

    yield put(reportPushAvatar());
}

function* setAvatarsWatcher() {
    yield takeLeading(SET_AVATARS, setAvatarsWorker);
}

function* unsetAvatarsWorker() {
    const success = yield call(API.unsetUserAvatars);

    if (!success)
        return put(emmitError(createUnsetAvatarError()));

    yield put(reportDeleteAvatar());
}

function* unsetAvatarsWatcher() {
    yield takeLeading(UNSET_AVATARS, unsetAvatarsWorker);
}

export default function* () {
    yield all([
        call(userLoginWatcher),
        call(userLogoutWatcher),
        call(userRegisterWatcher),
        call(userFetchWatcher),
        call(userEditWatcher),
        call(userDeleteWatcher),
        call(setAvatarsWatcher),
        call(unsetAvatarsWatcher),
        call(emmitErrorWatcher),
    ]);
}