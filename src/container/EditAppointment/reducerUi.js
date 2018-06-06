import {
    actionNames
} from '../../actions';
import {appointmentInit} from '../../constants';

export default (state = {
    appointment: appointmentInit,
    conflictFilterWhitelist: []
}, action) => {
    switch (action.type) {
        case actionNames.SET_EDIT_APPOINTMENT_APPOINTMENT_DATA:
            return {
                ...state,
                appointment: action.payload
            }
        case actionNames.SET_EDIT_APPOINTMENT_INPUT_FIELD:
            return {
                ...state,
                appointment: {
                    ...state.appointment,
                    [action.payload.name]: action.payload.value
                }
            }
        case actionNames.TOGGLE_EDIT_APPOINTMENT_CONFLICT_FILTER_WHITELIST:
            let conflictFilterWhitelist;
            if (state.conflictFilterWhitelist.find(item => item === action.payload)) {
                conflictFilterWhitelist = state.conflictFilterWhitelist.filter(item => item !== action.payload)
            } else {
                conflictFilterWhitelist = [...state.conflictFilterWhitelist, action.payload]
            }
            return {
                ...state,
                conflictFilterWhitelist
            }
        default:
            return state;
    }
}