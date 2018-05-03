export const actionNames = {
    SET_ADD_CALENDAR_INPUT_FIELD: 'SET_ADD_CALENDAR_INPUT_FIELD',
    SET_ADD_CALENDAR_LOADING: 'SET_ADD_CALENDAR_LOADING',
    SET_ADD_CALENDAR_ERROR: 'SET_ADD_CALENDAR_ERROR',
    SEND_ADD_CALENDAR_SEARCH: 'SEND_ADD_CALENDAR_SEARCH',
    APPLY_ADD_CALENDAR_RESPONSE: 'APPLY_ADD_CALENDAR_CALENDAR_RESPONSE',
    SET_ADD_CALENDAR_SHOW_DESCRIPTION: 'SET_ADD_CALENDAR_SHOW_DESCRIPTION',
    TOGGLE_ADD_CALENDAR_SELECTION: 'TOGGLE_ADD_CALENDAR_SELECTION'
}

export const actions = {
    setAddCalendarInputField: (name, value) => ({
        type: actionNames.SET_ADD_CALENDAR_INPUT_FIELD,
        payload: {
            name,
            value
        }
    }),
    setAddCalendarShowDescription: index => ({
        type: actionNames.SET_ADD_CALENDAR_SHOW_DESCRIPTION,
        payload: index
    }),
    toggleAddCalendarSelection: index => ({
        type: actionNames.TOGGLE_ADD_CALENDAR_SELECTION,
        payload: index
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