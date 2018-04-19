export const actionNames = {
    //data:
    SET_REGISTRATION_LOADING: 'SET_REGISTRATION_LOADING',
    SET_REGISTRATION_ERROR: 'SET_REGISTRATION_ERROR',
    SET_REGISTRATION_USERNAME_IN_USE: 'SET_REGISTRATION_USERNAME_IN_USE',
    SEND_REGISTRATION_DATA: 'SEND_REGISTRATION_DATA',
    LOOKUP_REGISTRATION_USERNAME: 'LOOKUP_REGISTRATION_USERNAME',


    //ui:
    SET_REGISTRATION_INPUT_FIELD: 'SET_REGISTRATION_INPUT_FIELD',
}

export const actions = {
    //data:
    setRegistrationLoading: status => ({
        type: actionNames.SET_REGISTRATION_LOADING,
        payload: status
    }),
    setRegistrationError: status => ({
        type: actionNames.SET_REGISTRATION_ERROR,
        payload: status
    }),
    setRegistrationUsernameInUse: status => ({
        type: actionNames.SET_REGISTRATION_USERNAME_IN_USE,
        payload: status
    }),
    sendRegistrationData: registrationData => ({
        type: actionNames.SEND_REGISTRATION_DATA,
        payload: registrationData
    }),
    lookupRegistrationUsername: username => ({
        type: actionNames.LOOKUP_REGISTRATION_USERNAME,
        payload: username
    }),


    //ui
    setRegistrationInputField: (name, value) => ({
        type: actionNames.SET_REGISTRATION_INPUT_FIELD,
        payload: {
            name,
            value
        }
    })

}