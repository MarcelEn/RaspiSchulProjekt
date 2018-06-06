export const actionNames = {
    SET_USER_SETTINGS_INPUT_FIELD: 'SET_USER_SETTINGS_INPUT_FIELD',
    SUBMIT_USER_SETTINGS_PASSWORD_CHANGE: 'SUBMIT_USER_SETTING_PASSWORD_CHANGE',
    SET_USER_SETTINGS_DATA_STATE: 'SET_USER_SETTING_DATA_STATE'
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
    setUserSettingsDataState: (name, state) => ({
        type: actionNames.SET_USER_SETTINGS_DATA_STATE,
        payload: {
            name,
            state
        }
    })
}