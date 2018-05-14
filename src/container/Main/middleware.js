import {
    put,
    call
} from 'redux-saga/effects';
import API from './../../apiConnector';
import {
    actions
} from './../../actions';

import {
    getCalendarFilter,
    setCalendarFilter
} from '../../globalFunctions';

export function* toggleMainCalendarFilter(action) {
    let currentCalendarFilter = getCalendarFilter();

    if (currentCalendarFilter.find(calendarId => calendarId === action.payload)) {
        currentCalendarFilter = currentCalendarFilter.filter(calendarId => calendarId !== action.payload);
    } else {
        currentCalendarFilter = [...currentCalendarFilter, action.payload];
    }

    setCalendarFilter(currentCalendarFilter);
    yield put(actions.setMainCalendarFilter(currentCalendarFilter));
}