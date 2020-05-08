import {all, takeEvery, put, call} from "redux-saga/effects";
import { DELETE, EDIT } from "./actions";
import {fetchCodeSample, setError} from "../../../common/code-sample-edit/api/actions";
import {deleteCodeSample as deleteCodeSampleFromList} from "../actions";
import API from "../../../../../core/api";
import { createDeleteError } from "../../../common/code-sample-edit/api/errors";

// When item clicked in list we need to tell edit screen to fetch code sample from database
function* editCodeSample(action) {
    yield put(fetchCodeSample(action.payload));
}

function* deleteCodeSample(action) {
    const success = yield call(API.deleteCodeSample, action.payload);
    if (!success)
        return put(setError(createDeleteError()));
    yield put(deleteCodeSampleFromList(action.payload));
}

function* editCodeSampleWatcher() {
    yield takeEvery(EDIT, editCodeSample);
}

function* deleteCodeSampleWatcher() {
    yield takeEvery(DELETE, deleteCodeSample);
}

export default function* () {
    yield all([
        call(editCodeSampleWatcher),
        call(deleteCodeSampleWatcher)
    ]);
}