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
    toggleMainCalendarFilter, downloadCalendar, uploadCalendar
} from './container/Main/middleware';

import { 
    saveManageCalendarEditing,
    deleteManageCalendarEditing
} from './container/ManageCalendar/middleware';

import { 
    handleCalendarviewDeletion,
    fetchAppointmentsOfAcitveCalendarsForThisWeek
} from './container/CalendarView/middleware';

import { 
    applyInitToEditAppointment,
    submitEditAppointmentData,
    setEditAppointmentInputField,
    toggleEditAppointmentConflictFilterWhitelist
} from './container/EditAppointment/middleware';

import {
    submitCreateCalendar
} from './container/CreateCalendar/middleware';


import {
    submitUserSettingsPasswordChange,
    submitUserSettingsUserData,
    initUserSettings,
    uploadUserSettingsProfileImage,
    deleteUserSettingsProfileImage
} from './container/UserSettings/middleware';

function* mySaga() {
    //UserSettings
    yield takeLatest(actionNames.DELETE_USER_SETTINGS_PROFILE_IMAGE, deleteUserSettingsProfileImage)
    yield takeLatest(actionNames.UPLOAD_USER_SETTINGS_PROFILE_IMAGE, uploadUserSettingsProfileImage)
    yield takeLatest(actionNames.SUBMIT_USER_SETTINGS_PASSWORD_CHANGE, submitUserSettingsPasswordChange)
    yield takeLatest(actionNames.INIT_USER_SETTINGS, initUserSettings)
    yield takeLatest(actionNames.SUBMIT_USER_SETTINGS_USER_DATA, submitUserSettingsUserData)

    //CreateCalendar
    yield takeLatest(actionNames.SUBMIT_CREATE_CALENDAR, submitCreateCalendar)

    //EditAppointment
    yield takeLatest(actionNames.TOGGLE_CALENDARVIEW_DETAILED_APPOINTMENT_ID, applyInitToEditAppointment)
    yield takeLatest(actionNames.SUBMIT_EDIT_APPOINTMENT_DATA, submitEditAppointmentData)
    yield takeLatest(actionNames.SET_EDIT_APPOINTMENT_INPUT_FIELD, setEditAppointmentInputField)
    yield takeLatest(actionNames.TOGGLE_EDIT_APPOINTMENT_CONFLICT_FILTER_WHITELIST, toggleEditAppointmentConflictFilterWhitelist)
    

    //CalendarView
    yield takeLatest(actionNames.HANDLE_CALENDARVIEW_DELETION, handleCalendarviewDeletion)
    yield takeLatest(actionNames.SET_CALENDARVIEW_DATE_OF_MONDAY, fetchAppointmentsOfAcitveCalendarsForThisWeek)
    //ManageCalendar
    yield takeLatest(actionNames.SAVE_MANAGE_CALENDAR_EDITING, saveManageCalendarEditing)
    yield takeLatest(actionNames.DELETE_MANAGE_CALENDAR_EDITING, deleteManageCalendarEditing)

    //Main
    yield takeLatest(actionNames.TOGGLE_MAIN_CALENDAR_FILTER, toggleMainCalendarFilter)
    yield takeLatest(actionNames.DOWNLOAD_CALENDAR, downloadCalendar)
    yield takeLatest(actionNames.UPLOAD_CALENDAR, uploadCalendar)

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