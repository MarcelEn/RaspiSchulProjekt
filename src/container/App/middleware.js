import {
    put,
    call
} from 'redux-saga/effects';
import API from './../../apiConnector';
import {
    actions
} from './../../actions';

export function* validateAppToken(action) {

    yield put(actions.setAppTokenError(false))
    yield put(actions.setAppTokenLoading(true))

    try {
        yield call(API.validateAppToken());
        yield put(actions.setAppTokenLoading(false))
        yield put(actions.setAppTokenIsValidated(true))
    } catch (error) {
        yield put(actions.setAppTokenIsSet(false))
        yield put(actions.setAppTokenLoading(false))
        yield put(actions.setAppTokenError(true))
    }
}

export function* sendLogout(action) {
    yield put(actions.setLogoutLoading(true))
    try {
        yield call(API.sendLogout());
    } catch (error) {

    }
    yield put(actions.setAppTokenIsSet(false));
    yield put(actions.setAppTokenIsValidated(false));
    yield put(actions.setLogoutLoading(false));
}

export function* fetchUserDataById(action) {
    try {
        yield call(API.fetchUserDataById(action.payload));
    } catch (error) {

    }
}