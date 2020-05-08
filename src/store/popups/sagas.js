import {all, call} from "redux-saga/effects";
import authRoot from "./auth/sagas";
import confirmRoot from "./confirm/sagas";
import passwordChangeRoot from "./password-change/sagas";

export default function* () {
    yield all([
        call(authRoot),
        call(confirmRoot),
        call(passwordChangeRoot),
    ]);
}