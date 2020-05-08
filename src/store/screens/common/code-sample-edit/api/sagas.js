import {all, takeEvery, put, call} from "redux-saga/effects";
import { DELETE_CODE_SAMPLE, SAVE_CODE_SAMPLE, FETCH_CODE_SAMPLE, setCodeSample, 
    setDidFetch, setDidSave, setDidDelete, setError, reportSave, reportDelete, reportFetch } from "./actions";
import API from "../../../../../core/api";
import { forceAuthenticationMiddleware } from "../../../../sagas";
import DataSource from "../../../../../components/screens/code-sample/editor-data/DataSource";
import { createSaveError, createDeleteError, createFetchError } from "./errors";

function* fetchCodeSample(action) {
    const codeSample = yield call(API.getCodeSample, action.payload.id);
    if (codeSample == null)
        return put(createFetchError());

    codeSample.type = DataSource.SOURCE_TEXT;
    yield put(setCodeSample(codeSample));
    yield put(setDidFetch());
    yield put(reportFetch(codeSample));
}

function* fetchCodeSampleWatcher() {
    yield takeEvery(FETCH_CODE_SAMPLE, forceAuthenticationMiddleware, fetchCodeSample);
}

function* saveCodeSample(action) {
    let codeSample = null;

    /* If code sample has id then we are editing otherwise createing new */
    if (action.payload?.id != null) {
        codeSample = yield call(API.editCodeSample, action.payload);
    } else {
        codeSample = yield call(API.createCodeSample, action.payload);
    }

    if (codeSample == null)
        return put(setError(createSaveError()));
    
    yield put(setDidSave());
    yield put(reportSave(codeSample));
}

function* saveCodeSampleWatcher() {
    yield takeEvery(SAVE_CODE_SAMPLE, saveCodeSample);
}

function* deleteCodeSample(action) {
    const success = yield call(API.deleteCodeSample, action.payload);
    if (!success)
        return put(setError(createDeleteError()));
    yield put(setDidDelete());
    yield put(reportDelete(action.payload));
}

function* deleteCodeSampleWatcher() {
    yield takeEvery(DELETE_CODE_SAMPLE, deleteCodeSample);
}

export default function* () {
    yield all([
        call(saveCodeSampleWatcher),
        call(deleteCodeSampleWatcher),
        call(fetchCodeSampleWatcher),
    ]);
}