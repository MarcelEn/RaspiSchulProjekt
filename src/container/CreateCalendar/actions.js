export const actionNames = {
    SET_CREATE_CALENDAR_INPUT_FIELD: 'SET_CREATE_CALENDAR_INPUT_FIELD',
    SUBMIT_CREATE_CALENDAR: 'SUBMIT_CREATE_CALENDAR',
    SET_CREATE_CALENDAR_DATA_STATE: 'SET_CREATE_CALENDAR_DATA_STATE'
}

export const actions = {
    setCreateCalendarInputField: (name, value) => ({
        type: actionNames.SET_CREATE_CALENDAR_INPUT_FIELD,
        payload: {
            name,
            value
        }
    }),
    submitCreateCalendar: () => ({
        type: actionNames.SUBMIT_CREATE_CALENDAR
    }),
    setCreateCalendarDataState: (name, state) => ({
        type: actionNames.SET_CREATE_CALENDAR_DATA_STATE,
        payload: {
            name,
            state
        }
    })
}