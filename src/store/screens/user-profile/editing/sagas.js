import {all, call, put, takeLeading} from "redux-saga/effects";
import { CHANGE_PASSWORD } from "./actions";
import { forceAuthenticationMiddleware } from "../../../sagas";
import { pushPopup } from "../../../popups/actions";
import {PASSWORD_CHANGE_POPUP} from "../../../../components/PopupTypes";


function* changePasswordWorker() {
    yield put(pushPopup(PASSWORD_CHANGE_POPUP));
}

function* changePasswordWatcher() {
    yield takeLeading(CHANGE_PASSWORD, forceAuthenticationMiddleware, changePasswordWorker);
}

export default function* () {
    yield all([
        call(changePasswordWatcher)
    ]);
}