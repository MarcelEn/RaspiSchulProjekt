import {
    actionNames
} from '../../actions';

export default (state = {
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    repeatPassword: '',
    displayPasswordError: false
}, action) => {
    switch (action.type) {
        case actionNames.SET_REGISTRATION_INPUT_FIELD:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        default:
            return state;
    }
}