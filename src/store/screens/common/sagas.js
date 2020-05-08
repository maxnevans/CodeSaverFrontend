import rootCodeSampleEdit from "./code-sample-edit/sagas";
import {all, call} from "redux-saga/effects";

export default function* () {
    yield all([
        call(rootCodeSampleEdit),
    ]);
}