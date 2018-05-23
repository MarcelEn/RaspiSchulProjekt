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
    ADD_APPOINTMENT_DATA: 'ADD_APPOINTMENT_DATA',
    REMOVE_APPOINTMENT_DATA_BY_ID: 'REMOVE_APPOINTMENT_DATA_BY_ID',
    REMOVE_CALENDAR_DATA_BY_ID: 'REMOVE_CALENDAR_DATA_BY_ID',
    FETCH_USER_DATA_BY_ID: 'FETCH_USER_DATA_BY_ID',
    SET_FIRST_INIT_IS_DONE: 'SET_FIRST_INIT_IS_DONE',
    UPDATE_SAVED_CALENDARS: 'UPDATE_SAVED_CALENDARS',
    FETCH_REMOTE_DATA_INIT: 'FETCH_REMOTE_DATA_INIT',
    REMOVE_SAVED_CALENDAR: 'REMOVE_SAVED_CALENDAR',
    ADD_SAVED_CALENDAR: 'ADD_SAVED_CALENDAR',
    SET_USER_ID: 'SET_USER_ID',

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
    addAppointmentData: appointmentData => ({
        type: actionNames.ADD_APPOINTMENT_DATA,
        payload: appointmentData
    }),
    removeAppointmentDatabyId: appointmentId => ({
        type: actionNames.REMOVE_APPOINTMENT_DATA_BY_ID,
        payload: appointmentId
    }),
    removeCalendarDataById: calendarId => ({
        type: actionNames.REMOVE_CALENDAR_DATA_BY_ID,
        payload: calendarId
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
    removeSavedCalendar: id => ({
        type: actionNames.REMOVE_SAVED_CALENDAR,
        payload: id
    }),
    addSavedCalendar: id => ({
        type: actionNames.ADD_SAVED_CALENDAR,
        payload: id
    }),
    fetchRemoteDataInit: () => ({
        type: actionNames.FETCH_REMOTE_DATA_INIT
    }),
    setUserId: userId => ({
        type: actionNames.SET_USER_ID,
        payload: userId
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