import {
    put,
    select
} from 'redux-saga/effects';
import {
    actions
} from './../../actions';

import {
    getCalendarFilter,
    setCalendarFilter,
    selectDateOfMonday
} from '../../globalFunctions';

import API from './../../apiConnector';
import { millisecondsOfWeek } from '../../constants';

export function* toggleMainCalendarFilter(action) {
    let currentCalendarFilter = getCalendarFilter();
    
    let fetch = false;

    if (currentCalendarFilter.find(calendarId => calendarId === action.payload)) {
        currentCalendarFilter = currentCalendarFilter.filter(calendarId => calendarId !== action.payload);
    } else {
        currentCalendarFilter = [...currentCalendarFilter, action.payload];
        fetch = true;
    }

    if(fetch){
        const mondayOfThisWeek = yield select(selectDateOfMonday)
        const response = yield API.searchAppointmentsByCalendarId(action.payload, mondayOfThisWeek, mondayOfThisWeek + millisecondsOfWeek)
        yield put(actions.addAppointmentData(response.data))
    }

    setCalendarFilter(currentCalendarFilter);
    yield put(actions.setMainCalendarFilter(currentCalendarFilter));
}