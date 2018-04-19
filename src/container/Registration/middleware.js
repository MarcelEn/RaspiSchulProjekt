import {
    put,
    call
} from 'redux-saga/effects';
import API from './../../apiConnector';
import {
    actions
} from './../../actions';

export function* sendRegistrationData(action) {
    yield put(actions.setRegistrationLoading(true));
    yield put(actions.setRegistrationError(false));

    try {

        yield call(API.sendRegistrationData(action.payload));
        yield put(actions.setRegistrationLoading(false));

    } catch (error) {

        yield put(actions.setRegistrationLoading(false));
        yield put(actions.setRegistrationError(true));

    }
}

export function* lookupRegistrationUsername(action) {
    yield put(actions.setRegistrationUsernameInUse(false));

    try {

        const response = yield call(API.searchUsername(action.payload));
        if(response.data[0] === action.payload){
            yield put(actions.setRegistrationUsernameInUse(true));
        }
    } catch (error) {
    }
}