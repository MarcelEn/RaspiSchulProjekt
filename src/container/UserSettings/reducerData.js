import {
    actionNames
} from "../../actions";

export default (state = {
    passwordSuccess: false,
    passwordError: false,
    passwordLoading: false,
    userDataIsAvailable: false
}, action) => {
    switch (action.type) {
        case actionNames.SET_USER_SETTINGS_DATA_STATE:
            return {
                ...state,
                [action.payload.name]: action.payload.state
            }
        default:
            return state;
    }
}