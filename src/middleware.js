import {
    takeLatest
} from 'redux-saga/effects'
import {
    actionNames
} from './actions';

import sendLoginData from './container/Login/middleware';


function* mySaga() {
    yield takeLatest(actionNames.SEND_LOGIN_DATA, sendLoginData);
}

export default mySaga;