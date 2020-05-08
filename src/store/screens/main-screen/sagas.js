import {all, call, takeEvery, put } from "redux-saga/effects";
import rootCodeSampleList from "./code-samples-list/sagas";
import { REPORT_SAVE } from "../common/code-sample-edit/api/actions";
import { addCodeSample } from "./code-samples-list/actions";
import { clearCodeSample } from "../common/code-sample-edit/actions";

function* saveCodeSample(action) {
    yield put(addCodeSample(action.payload));
    yield put(clearCodeSample());
}

function* saveCodeSampleWatcher() {
    yield takeEvery(REPORT_SAVE, saveCodeSample);
}

export default function* () {
    yield all([
        call(rootCodeSampleList),
        call(saveCodeSampleWatcher),
    ]);
}