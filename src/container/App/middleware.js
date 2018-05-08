import {
    put,
    call,
    select
} from 'redux-saga/effects';

import API from './../../apiConnector';

import {
    actions
} from './../../actions';

import {
    selectCalendarData
} from '../../globalFunctions';

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
        const response = yield call(API.fetchUserDataById(action.payload));
        for (let i = 0; i < response[0].length; i++) {
            yield put(actions.addUserData(response[0][i].data))
        }
    } catch (error) {}
}

export function* fetchRemoteDataInit(action) {
    yield put(actions.setFirstInitIsDone());
    yield(function* () {
        try {
            const savedCalendarsResponse = yield call(API.fetchSavedCalendars)
            yield put(actions.addCalendarData(savedCalendarsResponse.data))
            yield put(actions.updateSavedCalendars(
                savedCalendarsResponse.data.map(calendar => calendar.calendar_id)
            ))
        } catch (error) {}
    })();

}