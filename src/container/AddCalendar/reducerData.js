import {
    actionNames
} from "../../actions";

export default (state = {
    loading: false,
    error: false,
    searchResults: []
}, action) => {
    switch (action.type) {
        case actionNames.SET_ADD_CALENDAR_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case actionNames.SET_ADD_CALENDAR_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case actionNames.APPLY_ADD_CALENDAR_RESPONSE:
            return {
                ...state,
                searchResults: action.payload
            }
        default:
            return state;
    }
}