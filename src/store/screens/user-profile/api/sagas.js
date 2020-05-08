import {all, takeEvery, put, call, take} from "redux-saga/effects";
import { DELETE_USER, SAVE_USER, FETCH_USER, 
    setDidFetch, setDidSave, setDidDelete, setError, reportSave, reportDelete, reportFetch, 
    UPLOAD_AVATAR, reportUploadAvatar, setDidUploadAvatar, reportDeleteUserConfirmation,
    REPORT_DELETE_USER_CONFIRMATION, ASK_DELETE_USER_CONFIRMATION, askDeleteUserConfirmation } from "./actions";
import { forceAuthenticationMiddleware } from "../../../sagas";
import { createSaveError, createDeleteError, createFetchError, createUploadAvatarError } from "./errors";
import { fetchUser, REPORT_USER_FETCH, editUser, REPORT_USER_EDIT, deleteUser, REPORT_USER_DELETE } from "../../../user/actions";
import API from "../../../../core/api";
import { setAvatars } from "../editing/actions";
import { pushPopup } from "../../../popups/actions";
import { CONFIRM_POPUP } from "../../../../components/PopupTypes";
import { REPORT_RETURN } from "../../../popups/confirm/actions";

function* fetchUserWorker() {
    yield put(fetchUser());
    const user = (yield take(REPORT_USER_FETCH)).payload;
    if (user == null)
        return put(setError(createFetchError()));

    yield put(setDidFetch());
    yield put(reportFetch(user));
}

function* fetchUserWatcher() {
    yield takeEvery(FETCH_USER, forceAuthenticationMiddleware, fetchUserWorker);
}

function* saveUserWorker(action) {
    yield put(editUser(action.payload));
    const user = (yield take(REPORT_USER_EDIT)).payload;

    if (user == null)
        return put(setError(createSaveError()));

    yield put(setDidSave());
    yield put(reportSave(user));
}

function* saveUserWatcher() {
    yield takeEvery(SAVE_USER, forceAuthenticationMiddleware, saveUserWorker);
}

function* deleteUserWorker(action) {
    yield put(askDeleteUserConfirmation());
    const successConfirm = yield take(REPORT_DELETE_USER_CONFIRMATION).payload;

    if (!successConfirm) return;

    yield put(deleteUser(action.payload));
    const success = (yield take(REPORT_USER_DELETE)).payload;

    if (!success)
        return put(setError(createDeleteError()));

    yield put(setDidDelete());
    yield put(reportDelete(action.payload));
}

function* deleteUserWatcher() {
    yield takeEvery(DELETE_USER, forceAuthenticationMiddleware, deleteUserWorker);
}

function* uploadAvatarWorker(action) {
    const avatar = yield call(API.uploadAvatar, action.payload);

    if (avatar == null)
        return put(setError(createUploadAvatarError()));

    yield put(setAvatars([avatar]));

    yield put(setDidUploadAvatar());
    yield put(reportUploadAvatar(action.payload));
}

function* uploadAvatarWatcher() {
    yield takeEvery(UPLOAD_AVATAR, forceAuthenticationMiddleware, uploadAvatarWorker);
}

function* deleteUserConfirmationWorker() {
    yield put(pushPopup(CONFIRM_POPUP, {
        positiveCaption: "Delete",
        negativeCaption: "Cancel",
        message: "Are you sure you want to delete account?"
    }));
    const retValue = (yield take(REPORT_RETURN)).payload;

    return put(reportDeleteUserConfirmation(retValue));
}

function* deleteUserConfirmationWatcher() {
    yield takeEvery(ASK_DELETE_USER_CONFIRMATION, deleteUserConfirmationWorker);
}

export default function* () {
    yield all([
        call(saveUserWatcher),
        call(deleteUserWatcher),
        call(fetchUserWatcher),
        call(uploadAvatarWatcher),
        call(deleteUserConfirmationWatcher),
    ]);
}