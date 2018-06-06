export const actionNames = {
    SET_EDIT_APPOINTMENT_APPOINTMENT_DATA: 'SET_EDIT_APPOINTMENT_APPOINTMENT_DATA',
    SET_EDIT_APPOINTMENT_INPUT_FIELD: 'SET_EDIT_APPOINTMENT_INPUT_FIELD',
    TOGGLE_EDIT_APPOINTMENT_CONFLICT_FILTER_WHITELIST: 'TOGGLE_EDIT_APPOINTMENT_CONFLICT_FILTER_WHITELIST',

    SUBMIT_EDIT_APPOINTMENT_DATA: 'SUBMIT_EDIT_APPOINTMENT_DATA'
}

export const actions = {
    setEditAppointmentAppointmentData: data => ({
        type: actionNames.SET_EDIT_APPOINTMENT_APPOINTMENT_DATA,
        payload: data
    }),
    setEditAppointmentInputField: (name, value) => ({
        type: actionNames.SET_EDIT_APPOINTMENT_INPUT_FIELD,
        payload: {
            name,
            value
        }
    }),
    toggleEditAppointmentConflictFilterWhitelist: id => ({
        type: actionNames.TOGGLE_EDIT_APPOINTMENT_CONFLICT_FILTER_WHITELIST,
        payload: id
    }),
    submitEditAppointmentData: () => ({
        type: actionNames.SUBMIT_EDIT_APPOINTMENT_DATA
    })
}