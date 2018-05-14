import {
    actionNames
} from "../../actions";

export default (state = {
    error: false,
    loading: false,
    success: false
}, action) => {
    switch (action.type) {
        case actionNames.SET_MANAGE_CALENDAR_SUCCESS:
            return {
                ...state,
                success: action.payload
            }
        case actionNames.START_MANAGE_CALENDAR_EDITING:
            return {
                error: false,
                loading: false,
                success: false
            }
        case actionNames.SET_MANAGE_CALENDAR_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case actionNames.SET_MANAGE_CALENDAR_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}