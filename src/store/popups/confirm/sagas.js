import { RETURN_VALUE, setReturnValue, reportReturn } from "./actions";
import {all, call, put, takeEvery} from "redux-saga/effects";


function* returnValueWorker(action) {
    yield put(setReturnValue(action.payload));
    yield put(reportReturn(action.payload));
}

function* returnValueWatcher() {
    yield takeEvery(RETURN_VALUE, returnValueWorker);
}

export default function* () {
    yield all([
        call(returnValueWatcher)
    ]);
}