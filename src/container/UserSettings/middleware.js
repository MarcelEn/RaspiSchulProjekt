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
    selectUserSettingsUi,
    selectUserId,
    selectUserData
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

export function* uploadUserSettingsProfileImage(action) {
    yield put(actions.setUserSettingsDataState("profileImageLoading", true))
    yield put(actions.setUserSettingsDataState("profileImageError", false))
    yield put(actions.setUserSettingsDataState("profileImageSuccess", false))
    const profileImage = document.getElementById("profileImage").files[0]
    const formData = new FormData();
    formData.append('file', profileImage);

    const config = {
        onUploadProgress: function (progressEvent) {
            // Maybe add progressbar
            // console.log(Math.round((progressEvent.loaded * 100) / progressEvent.total));
        }
    };

    try {
        yield call(API.uploadProfileImage(formData, config))
        yield put(actions.setUserSettingsDataState("profileImageSuccess", true))
    } catch (error) {
        yield put(actions.setUserSettingsDataState("profileImageError", true))
    }
    yield put(actions.setUserSettingsDataState("profileImageLoading", false))
}


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
        } catch (error) {}
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

export function* deleteUserSettingsProfileImage(action) {
    yield put(actions.setUserSettingsDataState("deleteProfileImageLoading", true))
    yield put(actions.setUserSettingsDataState("deleteProfileImageError", false))
    yield put(actions.setUserSettingsDataState("deleteProfileImageSuccess", false))

    try {
        yield call(API.deleteProfileImage)
        yield put(actions.setUserSettingsDataState("deleteProfileImageSuccess", true))
    } catch (error) {
        yield put(actions.setUserSettingsDataState("deleteProfileImageError", true))
    }

    yield put(actions.setUserSettingsDataState("deleteProfileImageLoading", false))
}