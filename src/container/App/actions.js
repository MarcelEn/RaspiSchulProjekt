export const actionNames = {
    //data:
    SET_APP_TOKEN_IS_SET: 'SET_APP_TOKEN_IS_SET',
    SET_APP_TOKEN_IS_VALIDATED: 'SET_APP_TOKEN_IS_VALIDATED',
    SET_APP_TOKEN_LOADING: 'SET_APP_TOKEN_LOADING',
    SET_APP_TOKEN_ERROR: 'SET_APP_TOKEN_ERROR',
    VALIDATE_APP_TOKEN: 'VALIDATE_APP_TOKEN',

    SEND_LOGOUT: 'SEND_LOGOUT',
    SET_LOGOUT_LOADING: 'SET_LOGOUT_LOADING',


    //shared data:
    ADD_USER_DATA: 'ADD_USER_DATA',
    FETCH_USER_DATA_BY_ID: 'FETCH_USER_DATA_BY_ID',
    UPDATE_SAVED_CALENDARS: 'UPDATE_SAVED_CALENDARS',

    //ui
    SET_POPUP_ID: 'SET_POPUP_ID',
    CLOSE_POPUP: 'CLOSE_POPUP',
}

export const actions = {
    //data
    setAppTokenIsSet: status => ({
        type: actionNames.SET_APP_TOKEN_IS_SET,
        payload: status
    }),

    setAppTokenIsValidated: status => ({
        type: actionNames.SET_APP_TOKEN_IS_VALIDATED,
        payload: status
    }),

    setAppTokenLoading: status => ({
        type: actionNames.SET_APP_TOKEN_LOADING,
        payload: status
    }),

    setAppTokenError: status => ({
        type: actionNames.SET_APP_TOKEN_ERROR,
        payload: status
    }),

    validateAppToken: () => ({
        type: actionNames.VALIDATE_APP_TOKEN
    }),

    sendLogout: () => ({
        type: actionNames.SEND_LOGOUT
    }),
    setLogoutLoading: status => ({
        type: actionNames.SET_LOGOUT_LOADING,
        payload: status
    }),


    //shared data
    addUserData: userData => ({
        type: actionNames.ADD_USER_DATA,
        payload: userData
    }),
    fetchUserDataById: userId => ({
        type: actionNames.FETCH_USER_DATA_BY_ID,
        payload: userId
    }),
    updateSavedCalendars: () => ({
        type: actionNames.UPDATE_SAVED_CALENDARS
    }),


    //ui
    setPopupId: id => ({
        type: actionNames.SET_POPUP_ID,
        payload: id
    }),
    closePopup: () => ({
        type: actionNames.CLOSE_POPUP
    })
}