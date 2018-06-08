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
    selectUserSettingsUi, selectUserId, selectUserData
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

// userName: null,
//     firstName: null,
//     lastName: null,
//     mail: null,
//     oldPassword: null,
//     newPassword: null,
//     newPasswordRepeat: null,
//     profileImage: undefined



export function* initUserSettings(action) {
    const userId = yield select(selectUserId);
    let userData = (yield select(selectUserData)).find(user => user.user_id === userId)

    if (!userData) {
        try {
            const response = yield call(API.fetchUserDataById([userId]));
            for (let i = 0; i < response[0].length; i++) {
                yield put(actions.addUserData(response[0][i].data))
            }
            userData = response[0][0].data;
        } catch (error) { }
    }
    yield put(actions.setUserSettingsInputField("firstName", userData.first_name))
    yield put(actions.setUserSettingsInputField("lastName", userData.last_name))
    yield put(actions.setUserSettingsInputField("userName", userData.user_name))
    yield put(actions.setUserSettingsInputField("mail", userData.mail))

    yield put(actions.setUserSettingsDataState("userDataIsAvailable", true))
}

export function* submitUserSettingsUserData(action) {
    yield put(actions.setUserSettingsDataState("userDataLoading", true))
    yield put(actions.setUserSettingsDataState("userDataError", false))
    yield put(actions.setUserSettingsDataState("userDataSuccess", false))

    const userInput = yield select(selectUserSettingsUi);
    const userData = {
        user_name: userInput.userName,
        first_name: userInput.firstName,
        last_name: userInput.lastName,
        mail: userInput.mail,
    }

    try {
        yield call(API.updateUserData(userData))
        yield put(actions.addUserData({
            ...userData,
            user_id: yield select(selectUserId)
        }))
        yield put(actions.setUserSettingsDataState("userDataSuccess", true))
    } catch (error) {
        yield put(actions.setUserSettingsDataState("userDataError", true))
    }

    yield put(actions.setUserSettingsDataState("userDataLoading", false))
}