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
        const response = yield call(API.whoAmI);
        yield put(actions.setUserId(response.data));
        yield put(actions.setRegistrationLoading(false));
        yield put(actions.setAppTokenIsValidated(true));
        yield put(actions.setAppTokenIsSet(true));
    } catch (error) {

        yield put(actions.setRegistrationLoading(false));
        yield put(actions.setRegistrationError(true));

    }
}

export function* lookupRegistrationUsername(action) {
    yield put(actions.setRegistrationUsernameInUse(false));

    try {
        const response = yield call(API.searchUsername(action.payload));

        if(response.status === 200){
            yield put(actions.setRegistrationUsernameInUse(true));
        }else{
            yield put(actions.setRegistrationUsernameInUse(false));
        }

    } catch (error) {}
}