export const actionNames = {
    START_MANAGE_CALENDAR_EDITING: 'START_MANAGE_CALENDAR_EDITING',
    CANCEL_MANAGE_CALENDAR_EDITING: 'CANCEL_MANAGE_CALENDAR_EDITING',
    SET_MANAGE_CALENDAR_INPUT_FIELD: 'SET_MANAGE_CALENDAR_INPUT_FIELD',
    SAVE_MANAGE_CALENDAR_EDITING: 'SAVE_MANAGE_CALENDAR_EDITING',
    SET_MANAGE_CALENDAR_ERROR: 'SET_MANAGE_CALENDAR_ERROR',
    SET_MANAGE_CALENDAR_LOADING: 'SET_MANAGE_CALENDAR_LOADING',
    SET_MANAGE_CALENDAR_SUCCESS: 'SET_MANAGE_CALENDAR_SUCCESS'
}

export const actions = {
    startManageCalendarEditing: calendar => ({
        type: actionNames.START_MANAGE_CALENDAR_EDITING,
        payload: calendar
    }),
    setManageCalendarInputField: (name, value) => ({
        type: actionNames.SET_MANAGE_CALENDAR_INPUT_FIELD,
        payload: {
            name,
            value
        }
    }),
    cancelManageCalendarEditing: () => ({
        type: actionNames.CANCEL_MANAGE_CALENDAR_EDITING
    }),
    saveManageCalendarEditing: () => ({
        type: actionNames.SAVE_MANAGE_CALENDAR_EDITING
    }),
    setManageCalendarLoading: status => ({
        type: actionNames.SET_MANAGE_CALENDAR_LOADING,
        payload: status
    }),
    setManageCalendarError: status => ({
        type: actionNames.SET_MANAGE_CALENDAR_ERROR,
        payload: status
    }),
    setManageCalendarSuccess: status => ({
        type: actionNames.SET_MANAGE_CALENDAR_SUCCESS,
        payload: status
    })
}