import {
    actionNames
} from '../../actions';

export default (state = {
    editingCalendar: null,
    showDeleteWarning: false
}, action) => {
    switch (action.type) {
        case actionNames.SET_MANAGE_CALENDAR_DELETION_WARNING:
            return {
                ...state,
                showDeleteWarning: action.payload
            }
        case actionNames.START_MANAGE_CALENDAR_EDITING:
            return {
                ...state,
                editingCalendar: action.payload
            }
        case actionNames.CANCEL_MANAGE_CALENDAR_EDITING:
            return {
                ...state,
                editingCalendar: null,
                showDeleteWarning: false
            }
        case actionNames.SET_MANAGE_CALENDAR_INPUT_FIELD:
            return {
                ...state,
                editingCalendar: {
                    ...state.editingCalendar,
                    [action.payload.name]: action.payload.value
                }
            }
        default:
            return state;
    }
}