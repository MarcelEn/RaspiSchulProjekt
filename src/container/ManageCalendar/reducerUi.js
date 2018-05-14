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
        default:
            return state;
    }
}