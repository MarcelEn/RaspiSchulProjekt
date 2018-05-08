import {
    put,
    call
} from 'redux-saga/effects';
import API from './../../apiConnector';
import {
    actions
} from './../../actions';

export function* sendLoginData (action) {
    yield put(actions.setLoginLoading(true));
    yield put(actions.setLoginError(false));

    try {

        const response = yield call(API.sendLoginData(action.payload));
        yield put(actions.setUserId(response.data.user_id));
        yield put(actions.setLoginLoading(false));
        yield put(actions.setAppTokenIsValidated(true));
        yield put(actions.setAppTokenIsSet(true));

    } catch (error) {

        yield put(actions.setLoginLoading(false));
        yield put(actions.setLoginError(true));

    }
}