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
    selectConfirmDeletion
} from '../../globalFunctions';


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