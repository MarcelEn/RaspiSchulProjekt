import {
    put,
    call,
    select
} from 'redux-saga/effects';
import API from './../../apiConnector';
import {
    selectAppointmentData
} from '../../globalFunctions';
import {
    appointmentInit
} from '../../constants';
import {
    actions
} from '../../actions';
import {
    selectEditAppointmentUi
} from '../../globalFunctions';
import { fetchAppointmentsOfAcitveCalendarsForThisWeek } from '../CalendarView/middleware';

export function* applyInitToEditAppointment(action) {
    let editingAppointmentData;

    switch (action.payload) {
        case null:
            return;
        case undefined:
            editingAppointmentData = appointmentInit
            break;
        default:
            const appointmentData = yield select(selectAppointmentData);
            editingAppointmentData = appointmentData.find(appointment => appointment.appointment_id === action.payload)
    }
    yield put(actions.setEditAppointmentAppointmentData(editingAppointmentData));
}

export function* submitEditAppointmentData(action) {
    yield put(actions.setEditAppointmentError(false));
    yield put(actions.setEditAppointmentSuccess(false));
    yield put(actions.setEditAppointmentLoading(true));

    const appointmentData = (yield select(selectEditAppointmentUi)).appointment;

    if (appointmentData.appointment_id) {
        try {
            yield call(API.modifyAppointment(appointmentData));
            yield put(actions.updateAppointmentData(appointmentData));
            yield put(actions.setEditAppointmentSuccess(true));
        } catch (error) {
            yield put(actions.setEditAppointmentError(true));
        }
    } else {
        try {
            const response = yield call(API.addAppointment(appointmentData));
            yield put(actions.addAppointmentData([{
                ...appointmentData,
                appointment_id: response.data
            }]));
            yield put(actions.setEditAppointmentSuccess(true));
        } catch (error) {
            yield put(actions.setEditAppointmentError(true));
        }
    }
    yield put(actions.setEditAppointmentLoading(false));
}

export function* setEditAppointmentInputField(action) {
    if (action.payload.name === "start") {
        const start = action.payload.value;
        const end = (yield select(selectEditAppointmentUi)).appointment.end;

        if (end > start) {
            yield fetchAppointmentsOfAcitveCalendarsForThisWeek({ payload: { start, end } })
        }

    }
    if (action.payload.name === "end") {
        const start = (yield select(selectEditAppointmentUi)).appointment.start;
        const end = action.payload.value;

        if (end > start) {
            yield fetchAppointmentsOfAcitveCalendarsForThisWeek({ payload: { start, end } })
        }
    }
}

export function* toggleEditAppointmentConflictFilterWhitelist(action) {
    const ui = yield select(selectEditAppointmentUi);
    if (ui.conflictFilterWhitelist.find(id => id === action.payload)) {
        yield fetchAppointmentsOfAcitveCalendarsForThisWeek({
            payload: {
                start: ui.appointment.start,
                end: ui.appointment.end,
                activeCalendars: [action.payload]
            }
        })
    }
}