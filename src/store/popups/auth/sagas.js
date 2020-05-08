import {all, call} from "redux-saga/effects";
import rootLogin from "./login/sagas";
import rootRegister from "./register/sagas";

export default function* () {
    yield all([
        call(rootLogin),
        call(rootRegister),
    ]);
}