import {all, call} from "redux-saga/effects";
import rootUserProfileApi from "./api/sagas";
import rootUserProfileEditing from "./editing/sagas";

export default function* () {
    yield all([
        call(rootUserProfileApi),
        call(rootUserProfileEditing),
    ]);
}