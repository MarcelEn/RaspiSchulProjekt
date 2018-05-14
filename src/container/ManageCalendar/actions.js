export const actionNames = {
    START_MANAGE_CALENDAR_EDITING: 'START_MANAGE_CALENDAR_EDITING'
}

export const actions = {
    startManageCalendarEditing: calendar => ({
        type: actionNames.START_MANAGE_CALENDAR_EDITING,
        payload: calendar
    })
}