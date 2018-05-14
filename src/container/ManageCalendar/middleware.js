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
    selectEditingCalendar
} from '../../globalFunctions'


export function* saveManageCalendarEditing(action) {
    yield put(actions.setManageCalendarLoading(true))
    yield put(actions.setManageCalendarError(false))
    yield put(actions.setManageCalendarSuccess(false))
    const newCalendarData = yield select(selectEditingCalendar)

    try {
        yield call(API.updateCalendarData(newCalendarData))
        yield put(actions.setManageCalendarSuccess(true))
    } catch (error) {
        yield put(actions.setManageCalendarError(true))
    }

    yield put(actions.setManageCalendarLoading(false))
}