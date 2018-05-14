export const actionNames = {
    TOGGLE_MAIN_CALENDAR_FILTER: 'TOGGLE_MAIN_CALENDAR_FILTER',
    SET_MAIN_CALENDAR_FILTER: 'SET_MAIN_CALENDAR_FILTER'
}

export const actions = {
    toggleMainCalendarFilter: calendarId => ({
        type: actionNames.TOGGLE_MAIN_CALENDAR_FILTER,
        payload: calendarId
    }),
    setMainCalendarFilter: calendarIds => ({
        type: actionNames.SET_MAIN_CALENDAR_FILTER,
        payload: calendarIds
    })
}