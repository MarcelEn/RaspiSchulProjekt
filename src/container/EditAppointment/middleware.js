import {
    put,
    call,
    select
} from 'redux-saga/effects';
import API from './../../apiConnector';
import {
    selectAppointmentData,
    getTodayInMilliseconds
} from '../../globalFunctions';
import {
    actions
} from '../../actions';
import {
    selectEditAppointmentUi
} from '../../globalFunctions';

export function* applyInitToEditAppointment(action) {
    let editingAppointmentData;

    switch (action.payload) {
        case null:
            return;
        case undefined:
            editingAppointmentData = {
                appointment_description: "",
                appointment_title: "",
                appointment_id: null,
                calendar_id: "",
                end: getTodayInMilliseconds(),
                start: getTodayInMilliseconds()
            }
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
    }
    yield put(actions.setEditAppointmentLoading(false));
}