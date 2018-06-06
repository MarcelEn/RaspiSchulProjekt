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
    selectUserSettingsUi
} from '../../globalFunctions';

export function* submitUserSettingsPasswordChange(action) {
    yield put(actions.setUserSettingsDataState("passwordLoading", true))
    yield put(actions.setUserSettingsDataState("passwordError", false))
    yield put(actions.setUserSettingsDataState("passwordSuccess", false))

    const useInput = yield select(selectUserSettingsUi);
    try {
        yield call(API.changePassword(useInput.oldPassword, useInput.newPassword))
        yield put(actions.setUserSettingsDataState("passwordSuccess", true))
    } catch (error) {
        yield put(actions.setUserSettingsDataState("passwordError", true))

    }

    yield put(actions.setUserSettingsDataState("passwordLoading", false))
}