export const actionNames = {
    TOGGLE_MAIN_CALENDAR_FILTER: 'TOGGLE_MAIN_CALENDAR_FILTER',
    SET_MAIN_CALENDAR_FILTER: 'SET_MAIN_CALENDAR_FILTER',
    DOWNLOAD_CALENDAR: 'DOWNLOAD_CALENDAR',
    UPLOAD_CALENDAR: 'UPLOAD_CALENDAR'
}

export const actions = {
    toggleMainCalendarFilter: calendarId => ({
        type: actionNames.TOGGLE_MAIN_CALENDAR_FILTER,
        payload: calendarId
    }),
    setMainCalendarFilter: calendarIds => ({
        type: actionNames.SET_MAIN_CALENDAR_FILTER,
        payload: calendarIds
    }),
    uploadCalendar: event => ({
        type: actionNames.UPLOAD_CALENDAR
    }),
    downloadCalendar: calendarId => ({
        type: actionNames.DOWNLOAD_CALENDAR,
        payload: calendarId
    })
}