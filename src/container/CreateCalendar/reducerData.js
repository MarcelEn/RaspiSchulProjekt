import {
    actionNames
} from "../../actions";

export default (state = {
    error: false,
    loading: false,
    success: false
}, action) => {
    switch (action.type) {
        case actionNames.SET_CREATE_CALENDAR_DATA_STATE:
            return {
                ...state,
                [action.payload.name]: action.payload.state
            }
        default:
            return state;
    }
}