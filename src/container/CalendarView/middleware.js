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
    selectDetailedAppointmentId,
    selectConfirmDeletion,
    selectActiveCalendar,
    selectConflictFilterWhitelist
} from '../../globalFunctions';
import axios from 'axios';
import { millisecondsOfWeek } from '../../constants';

export function* handleCalendarviewDeletion(action) {
    if (!(yield select(selectConfirmDeletion))) {
        yield put(actions.setCalendarviewConfirmDeletion(true))
    } else {
        const appointmentId = yield select(selectDetailedAppointmentId);
        try {
            yield call(API.deleteAppointmentById(appointmentId));
            yield put(actions.toggleCalendarviewDetailedAppointmentId(null));
            yield put(actions.removeAppointmentDatabyId(appointmentId));
        } catch (e) {

        }
    }
}


const createMultipleRequests = requests => () => new Promise(
    (resolve, reject) => {
        axios.all(requests)
            .then((...responses) => resolve(responses))
            .catch(e => {
                reject(e)
            })
    }
)

export function* fetchAppointmentsOfAcitveCalendarsForThisWeek(action) {
    let start, end, activeCalendars;
    if (typeof action.payload === "number") {
        activeCalendars = yield select(selectActiveCalendar);
        start = action.payload;
        end = start + millisecondsOfWeek;
    } else {
        if (action.payload.activeCalendars) {
            activeCalendars = action.payload.activeCalendars
        } else {
            activeCalendars = yield select(selectConflictFilterWhitelist);
        }
        start = action.payload.start;
        end = action.payload.end;
    }

    try {
        const responses = yield call(
            createMultipleRequests(
                activeCalendars
                    .map(calendarId => API.searchAppointmentsByCalendarId(calendarId, start, end))
            )
        )
        for (let i = 0; i < responses[0].length; i++) {
            yield put(actions.addAppointmentData(responses[0][i].data))
        }
    } catch (error) { }
}