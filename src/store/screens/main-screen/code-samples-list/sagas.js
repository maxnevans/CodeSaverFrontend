import rootCodeSample from "./code-sample/sagas";
import {all, takeEvery, call, put} from "redux-saga/effects";
import { FETCH_CODE_SAMPLES, setCodeSamples, setError, reportFetch, reportError, } from "./actions";
import API from "../../../../core/api";
import { forceAuthenticationMiddleware } from "../../../sagas";
import { createFetchCodeSamplesError } from "./errors";

function* fetchCodeSamples() {
    const codeSamples = yield call(API.getCodeSamples);
    if (codeSamples == null) {
        const error = createFetchCodeSamplesError();
        yield put(setError(error));
        yield put(reportError(error));
        return;
    }

    // Convert array to Map
    const mapCodeSamples = codeSamples.map(codeSample => [codeSample.id, codeSample]);
    yield put(setCodeSamples(mapCodeSamples));
    yield put(reportFetch(mapCodeSamples));
}

function* fetchCodeSamplesWatcher() {
    yield takeEvery(FETCH_CODE_SAMPLES, forceAuthenticationMiddleware, fetchCodeSamples);
}

export default function* () {
    yield all([
        call(rootCodeSample),
        call(fetchCodeSamplesWatcher),
    ]);
}