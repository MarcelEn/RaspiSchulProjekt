import {
    actionNames
} from "../../actions";

export default (state = {
    loading: false,
    error: false,
    success: false
}, action) => {
    switch (action.type) {
        case actionNames.SET_EDIT_APPOINTMENT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case actionNames.SET_EDIT_APPOINTMENT_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case actionNames.SET_EDIT_APPOINTMENT_SUCCESS:
            return {
                ...state,
                success: action.payload
            }
        default:
            return state;
    }
}