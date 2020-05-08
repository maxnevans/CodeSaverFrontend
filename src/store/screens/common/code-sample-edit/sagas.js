import {all, call} from "redux-saga/effects";
import rootApi from "./api/sagas";

export default function* () {
    yield all([
        call(rootApi),
    ]);
}