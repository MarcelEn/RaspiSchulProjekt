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
        const owner_id = yield select(selectUserId);
        console.log(owner_id)
        const response = yield call(API.createCalendar({
            ...calendarData,
            owner_id
        }))
        yield put(actions.addCalendarData([{
            ...calendarData,
            calendar_id: response.data,
            owner_id
        }]))
        yield put(actions.setCreateCalendarDataState("success", true))
    } catch (error) {
        yield put(actions.setCreateCalendarDataState("error", true))
    }
    yield put(actions.setCreateCalendarDataState("loading", false))
}