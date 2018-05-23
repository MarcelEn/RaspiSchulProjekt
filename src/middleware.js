import {
    takeLatest
} from 'redux-saga/effects'
import {
    actionNames
} from './actions';

import {
    sendLoginData
} from './container/Login/middleware';

import {
    sendRegistrationData,
    lookupRegistrationUsername
} from './container/Registration/middleware';

import {
    validateAppToken,
    sendLogout,
    fetchRemoteDataInit
} from './container/App/middleware';

import {
    sendAddCalendarSearch,
    toggleAddCalendarSelection
} from './container/AddCalendar/middleware';

import {
    fetchUserDataById
} from './container/App/middleware';

import {
    toggleMainCalendarFilter
} from './container/Main/middleware';

import { 
    saveManageCalendarEditing,
    deleteManageCalendarEditing
} from './container/ManageCalendar/middleware';

import { 
    handleCalendarviewDeletion
} from './container/CalendarView/middleware';

function* mySaga() {
    //CalendarView
    yield takeLatest(actionNames.HANDLE_CALENDARVIEW_DELETION, handleCalendarviewDeletion)

    //ManageCalendar
    yield takeLatest(actionNames.SAVE_MANAGE_CALENDAR_EDITING, saveManageCalendarEditing)
    yield takeLatest(actionNames.DELETE_MANAGE_CALENDAR_EDITING, deleteManageCalendarEditing)

    //Main
    yield takeLatest(actionNames.TOGGLE_MAIN_CALENDAR_FILTER, toggleMainCalendarFilter)

    //AddCalendar
    yield takeLatest(actionNames.SEND_ADD_CALENDAR_SEARCH, sendAddCalendarSearch);
    yield takeLatest(actionNames.TOGGLE_ADD_CALENDAR_SELECTION, toggleAddCalendarSelection);

    //Tokenvalidation
    yield takeLatest(actionNames.VALIDATE_APP_TOKEN, validateAppToken);

    //Registration
    yield takeLatest(actionNames.SEND_REGISTRATION_DATA, sendRegistrationData);
    yield takeLatest(actionNames.LOOKUP_REGISTRATION_USERNAME, lookupRegistrationUsername);

    //Login
    yield takeLatest(actionNames.SEND_LOGIN_DATA, sendLoginData);

    //Logout
    yield takeLatest(actionNames.SEND_LOGOUT, sendLogout);

    //shared App data
    yield takeLatest(actionNames.FETCH_USER_DATA_BY_ID, fetchUserDataById)
    yield takeLatest(actionNames.FETCH_REMOTE_DATA_INIT, fetchRemoteDataInit)
}

export default mySaga;