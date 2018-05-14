import {
    actionNames
} from '../../actions';

export default (state = {
    editingCalendar: null
}, action) => {
    switch (action.type) {
        case actionNames.START_MANAGE_CALENDAR_EDITING:
            return {
                ...state,
                editingCalendar: action.payload
            }
        case actionNames.CANCEL_MANAGE_CALENDAR_EDITING:
            return {
                ...state,
                editingCalendar: null
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