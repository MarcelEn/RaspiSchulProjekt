import {
    actionNames
} from '../../actions';

import {
    getCookie
} from '../../globalFunctions';

export default (state = {
    tokenIsSet: getCookie('accessToken') ? true : false,
    tokenIsValidated: false,
    tokenLoading: false,
    tokenError: false,
    logoutLoading: false
}, action) => {
    switch (action.type) {
        case actionNames.SET_APP_TOKEN_IS_SET:
            return {
                ...state,
                tokenIsSet: action.payload
            }
        case actionNames.SET_APP_TOKEN_IS_VALIDATED:
            return {
                ...state,
                tokenIsValidated: action.payload
            }
        case actionNames.SET_APP_TOKEN_LOADING:
            return {
                ...state,
                tokenLoading: action.payload
            }
        case actionNames.SET_APP_TOKEN_ERROR:
            return {
                ...state,
                tokenError: action.payload
            }
        case actionNames.SET_LOGOUT_LOADING:
            return {
                ...state,
                logoutLoading: action.payload
            }

        default:
            return state;
    }
}