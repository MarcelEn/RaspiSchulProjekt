import moment from 'moment';

import {
    actionNames
} from '../../actions';

export default (state = {
    dateOfMonday: moment(moment().isoWeekday(1).format("YYYY-MM-DD")).valueOf(),
    detailedAppointmentId: null,
    confirmDeletion: false
}, action) => {
    switch (action.type) {
        case actionNames.SET_CALENDARVIEW_DATE_OF_MONDAY:
            return {
                ...state,
                dateOfMonday: action.payload
            }
        case actionNames.TOGGLE_CALENDARVIEW_DETAILED_APPOINTMENT_ID:
            return {
                ...state,
                detailedAppointmentId: state.detailedAppointmentId === action.payload ? null : action.payload,
                confirmDeletion: false
            }
        case actionNames.SET_CALENDARVIEW_CONFIRM_DELETION:
            return {
                ...state,
                confirmDeletion: action.payload
            }
        default:
            return state;
    }
}