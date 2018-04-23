import {
    actionNames
} from '../../actions';

import {
    getCookie
} from '../../globalFunctions';

export default (state = {
    tokenIsSet: getCookie('accessToken') ? true : false,
    userData: [],
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
        case actionNames.ADD_USER_DATA:
            const index = state.userData.findIndex(user => user.user_id === action.payload.user_id);
            if (index === -1) {
                return {
                    ...state,
                    userData: [...state.userData, action.payload]
                }
            } else {
                let newUserData = [...state.userData];
                newUserData[index] = action.payload
                return {
                    ...state,
                    userData: newUserData
                }
            }

        default:
            return state;
    }
}