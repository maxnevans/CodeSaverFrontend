import {all, takeLeading, take, race, call, put, spawn} from "redux-saga/effects";
import rootUser from "./user/sagas";
import rootPopups from "./popups/sagas";
import rootScreens from "./screens/sagas";
import { REQUIRE_AUTHENTICATION, requireAuthentication as requireAuthenticationAction, RESET_APP, reportResetApp, clearApp } from "./actions";
import {pushPopup} from "./popups/actions";
import {AUTH_POPUP} from "../components/PopupTypes";
import { REPORT_USER_LOGIN, REPORT_USER_REGISTER, fetchUser } from "./user/actions";
import { UNAUTHORIZED, APILogicError } from "../core/api-core";

/**
 * Forces user authentication for a given generator if it fails and tries again to execute
 * generator until it secceded.
 * @param {Generator} cbg 
 * @param  {...any} args 
 */
export function* forceAuthenticationMiddleware(cbg, ...args) {
    let isComplete = false;
    while (!isComplete) {
        try {
            yield call(cbg, ...args);
            isComplete = true;
        } catch (e) {
            if (e instanceof APILogicError) {
                if (e.logicCode == UNAUTHORIZED) {
                    yield put(requireAuthenticationAction());
                    yield race([take(REPORT_USER_LOGIN), take(REPORT_USER_REGISTER)]);
                } else {
                    throw e;
                }
            } else {
                throw e;
            }
        }
    }
}

function* requireAuthentication() {
    yield put(pushPopup(AUTH_POPUP));
}

function* requireAuthenticationWatcher() {
    yield takeLeading(REQUIRE_AUTHENTICATION, requireAuthentication);
}

function* startupTasks() {
    yield put(fetchUser());
}

function* resetAppWorker() {
    yield put(clearApp());
    yield put(reportResetApp());
}

function* resetAppWatcher() {
    yield takeLeading(RESET_APP, resetAppWorker);
}

export default function* () {
    yield all([
        spawn(startupTasks),
        spawn(requireAuthenticationWatcher),
        spawn(resetAppWatcher),
        
        spawn(rootUser),
        spawn(rootScreens),
        spawn(rootPopups),
    ]);
}