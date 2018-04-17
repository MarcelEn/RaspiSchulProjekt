import {
    actionNames
} from "../../actions";

export default (state = {
    loading: false,
    error: false
}, action) => {
    switch (action.type) {
        case actionNames.SET_LOGIN_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case actionNames.SET_LOGIN_LOADING:
            return {
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}