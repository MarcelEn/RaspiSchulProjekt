import {
    actionNames
} from '../../actions';

export default (state = {
    usernameInUse: false,
    error: false,
    loading: false
}, action) => {
    switch (action.type) {
        case actionNames.SET_REGISTRATION_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case actionNames.SET_REGISTRATION_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        case actionNames.SET_REGISTRATION_USERNAME_IN_USE:
            return {
                ...state,
                usernameInUse: action.payload
            }
        default:
            return state;
    }
}