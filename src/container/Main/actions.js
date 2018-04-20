export const actionNames = {
    SET_APP_TOKEN_IS_SET: 'SET_APP_TOKEN_IS_SET',
    SET_APP_TOKEN_IS_VALIDATED: 'SET_APP_TOKEN_IS_VALIDATED',
    SET_APP_TOKEN_LOADING: 'SET_APP_TOKEN_LOADING',
    SET_APP_TOKEN_ERROR: 'SET_APP_TOKEN_ERROR',
    VALIDATE_APP_TOKEN: 'VALIDATE_APP_TOKEN',

    SEND_LOGOUT: 'SEND_LOGOUT',
    SET_LOGOUT_LOADING: 'SET_LOGOUT_LOADING'
}

export const actions = {
    setAppTokenIsSet: status => ({
        type: actionNames.SET_APP_TOKEN_IS_SET,
        payload: status
    }),
    
    setAppTokenIsValidated: status => ({
        type: actionNames.SET_APP_TOKEN_IS_VALIDATED,
        payload: status
    }),

    setAppTokenLoading: status => ({
        type: actionNames.SET_APP_TOKEN_LOADING,
        payload: status
    }),

    setAppTokenError: status => ({
        type: actionNames.SET_APP_TOKEN_ERROR,
        payload: status
    }),

    validateAppToken: () => ({
        type: actionNames.VALIDATE_APP_TOKEN
    }),

    sendLogout: () => ({
        type: actionNames.SEND_LOGOUT
    }),
    setLogoutLoading: status => ({
        type: actionNames.SET_LOGOUT_LOADING,
        payload: status
    })

}