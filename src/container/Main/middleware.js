import {
    put
} from 'redux-saga/effects';
import {
    actions
} from './../../actions';

import {
    getCalendarFilter,
    setCalendarFilter
} from '../../globalFunctions';

import API from './../../apiConnector';

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
        const response = yield API.searchAppointmentsByCalendarId(action.payload, 0, new Date().valueOf() * 2)
        yield put(actions.addAppointmentData(response.data))
    }

    setCalendarFilter(currentCalendarFilter);
    yield put(actions.setMainCalendarFilter(currentCalendarFilter));
}