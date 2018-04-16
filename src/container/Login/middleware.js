import {
    put,
    call
} from 'redux-saga/effects';
import API from './../../apiConnector';
import {
    actions
} from './../../actions';

export default function* (action) {
    yield put(actions.setLoginLoading(true));
    yield put(actions.setLoginError(false));

    try {

        yield call(API.sendLoginData(action.payload));
        yield put(actions.setLoginLoading(false));

    } catch (error) {

        yield put(actions.setLoginLoading(false));
        yield put(actions.setLoginError(true));

    }
}