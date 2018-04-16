export const actionNames = {
    SEND_LOGIN_DATA: 'SEND_LOGIN_DATA',
    SET_LOGIN_LOADING: 'SET_LOGIN_LOADING',
    SET_LOGIN_ERROR: 'SET_LOGIN_ERROR'
}

export const actions = {
    sendLoginData: loginData => (
        {
            type: actionNames.SEND_LOGIN_DATA,
            payload: loginData
        }
    ),
    setLoginError: status => (
        {
            type: actionNames.SET_LOGIN_ERROR,
            payload: status
        }
    ),
    setLoginLoading: status => (
        {
            type: actionNames.SET_LOGIN_LOADING,
            payload: status
        }
    )
}