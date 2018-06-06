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
    selectCreateCalendarUi,
    selectUserId
} from '../../globalFunctions'


export function* submitCreateCalendar(action) {
    yield put(actions.setCreateCalendarDataState("loading", true))
    yield put(actions.setCreateCalendarDataState("error", false))
    yield put(actions.setCreateCalendarDataState("success", false))
    const calendarData = yield select(selectCreateCalendarUi);
    try {
        const response = yield call(API.createCalendar(calendarData))
        yield put(actions.addCalendarData([{
            ...calendarData,
            ...response.data,
            owner_id: yield(select(selectUserId))
        }]))
        yield put(actions.setCreateCalendarDataState("success", true))
    } catch (error) {
        yield put(actions.setCreateCalendarDataState("error", true))
    }
    yield put(actions.setCreateCalendarDataState("loading", false))
}