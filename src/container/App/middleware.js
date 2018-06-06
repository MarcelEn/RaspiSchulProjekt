import {
    put,
    call,
    select
} from 'redux-saga/effects';

import API from './../../apiConnector';

import {
    actions
} from './../../actions';

import axios from 'axios';

import {
    selectUserId,
    selectActiveCalendar
} from '../../globalFunctions';

const createMultipleRequests = requests => () => new Promise(
    (resolve, reject) => {
        axios.all(requests)
            .then((...responses) => resolve(responses))
            .catch(e => {
                reject(e)
            })
    }
)

export function* validateAppToken(action) {

    yield put(actions.setAppTokenError(false))
    yield put(actions.setAppTokenLoading(true))

    try {
        const response = yield call(API.validateAppToken());
        yield put(actions.setUserId(response.data.user_id));
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

    //TODO: make this calls paralel
    yield(function* () {
        try {
            const savedCalendarsResponse = yield call(API.fetchSavedCalendars)
            yield put(actions.addCalendarData(savedCalendarsResponse.data))
            yield put(actions.updateSavedCalendars(
                savedCalendarsResponse.data.map(calendar => calendar.calendar_id)
            ))
        } catch (error) {}
    })();

    yield(function* () {
        try {
            const userId = yield select(selectUserId);
            const calendarsResponse = yield call(API.sendAddCalendarSearch('', userId));
            yield put(actions.addCalendarData(calendarsResponse.data));
        } catch (error) {}
    })();

    yield(function* () {
        try {
            const activeCalendars = yield select(selectActiveCalendar);
            const responses = yield call(
                createMultipleRequests(
                    activeCalendars
                    .map(calendarId => API.searchAppointmentsByCalendarId(calendarId))
                )
            )
            for(let i = 0; i < responses[0].length; i ++){
                yield put(actions.addAppointmentData(responses[0][i].data))
            }
        } catch (error) {}
    })();
}