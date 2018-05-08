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
    ADD_CALENDAR_DATA: 'ADD_CALENDAR_DATA',
    FETCH_USER_DATA_BY_ID: 'FETCH_USER_DATA_BY_ID',
    SET_FIRST_INIT_IS_DONE: 'SET_FIRST_INIT_IS_DONE',
    UPDATE_SAVED_CALENDARS: 'UPDATE_SAVED_CALENDARS',
    FETCH_REMOTE_DATA_INIT: 'FETCH_REMOTE_DATA_INIT',

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
    addCalendarData: calendarData => ({
        type: actionNames.ADD_CALENDAR_DATA,
        payload: calendarData
    }),
    fetchUserDataById: userId => ({
        type: actionNames.FETCH_USER_DATA_BY_ID,
        payload: userId
    }),
    setFirstInitIsDone: () => ({
        type: actionNames.SET_FIRST_INIT_IS_DONE
    }),
    updateSavedCalendars: ids => ({
        type: actionNames.UPDATE_SAVED_CALENDARS,
        payload: ids
    }),
    fetchRemoteDataInit: () => ({
        type: actionNames.FETCH_REMOTE_DATA_INIT
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