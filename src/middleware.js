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
    sendLogout
} from './container/App/middleware';

import {
    sendAddCalendarSearch
} from './container/AddCalendar/middleware';

import {
    fetchUserDataById
} from './container/App/middleware';



function* mySaga() {
    //AddCalendar
    yield takeLatest(actionNames.SEND_ADD_CALENDAR_SEARCH, sendAddCalendarSearch);
    
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
}

export default mySaga;