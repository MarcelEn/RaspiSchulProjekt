export const actionNames = {
    SET_USER_SETTINGS_INPUT_FIELD: 'SET_USER_SETTINGS_INPUT_FIELD',
    SUBMIT_USER_SETTINGS_PASSWORD_CHANGE: 'SUBMIT_USER_SETTING_PASSWORD_CHANGE',
    SUBMIT_USER_SETTINGS_USER_DATA: 'SUBMIT_USER_SETTING_USER_DATA',
    SET_USER_SETTINGS_DATA_STATE: 'SET_USER_SETTING_DATA_STATE',
    INIT_USER_SETTINGS: 'INIT_USER_SETTINGS',
    UPLOAD_USER_SETTINGS_PROFILE_IMAGE: 'UPLOAD_USER_SETTINGS_PROFILE_IMAGE'
}

export const actions = {
    setUserSettingsInputField: (name, value) => ({
        type: actionNames.SET_USER_SETTINGS_INPUT_FIELD,
        payload: {
            name,
            value
        }
    }),
    submitUserSettingsPasswordChange: () => ({
        type: actionNames.SUBMIT_USER_SETTINGS_PASSWORD_CHANGE
    }),
    submitUserSettingsUserData: () => ({
        type: actionNames.SUBMIT_USER_SETTINGS_USER_DATA
    }),
    setUserSettingsDataState: (name, state) => ({
        type: actionNames.SET_USER_SETTINGS_DATA_STATE,
        payload: {
            name,
            state
        }
    }),
    initUserSettings: () => ({
        type: actionNames.INIT_USER_SETTINGS
    }),
    uploadUserSettingsProfileImage: () => ({
        type: actionNames.UPLOAD_USER_SETTINGS_PROFILE_IMAGE
    }),
}