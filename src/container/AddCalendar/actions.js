export const actionNames = {
    SET_ADD_CALENDAR_INPUT_FIELD: 'SET_ADD_CALENDAR_INPUT_FIELD',
    SET_ADD_CALENDAR_LOADING: 'SET_ADD_CALENDAR_LOADING',
    SET_ADD_CALENDAR_ERROR: 'SET_ADD_CALENDAR_ERROR',
    SEND_ADD_CALENDAR_SEARCH: 'SEND_ADD_CALENDAR_SEARCH',
    APPLY_ADD_CALENDAR_RESPONSE: 'APPLY_ADD_CALENDAR_CALENDAT_RESPONSE'
}

export const actions = {
    setAddCalendarInputField: (name, value) => ({
        type: actionNames.SET_ADD_CALENDAR_INPUT_FIELD,
        payload: {
            name,
            value
        }
    }),
    setAddCalendarLoading: status => ({
        type: actionNames.SET_ADD_CALENDAR_LOADING,
        payload: status
    }),
    setAddCalendarError: status => ({
        type: actionNames.SET_ADD_CALENDAR_ERROR,
        payload: status
    }),
    sendAddCalendarSearch: userinput => ({
        type: actionNames.SEND_ADD_CALENDAR_SEARCH,
        payload: userinput
    }),
    applyAddCalendarResponse: response => ({
        type: actionNames.APPLY_ADD_CALENDAR_RESPONSE,
        payload: response
    })
}