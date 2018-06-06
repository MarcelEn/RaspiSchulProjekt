import {
    actionNames
} from '../../actions';

export default (state = {
    userName: null,
    firstName: null,
    lastName: null,
    mail: null,
    oldPassword: "",
    newPassword: "",
    newPasswordRepeat: "",
    profileImage: null
}, action) => {
    switch (action.type) {
        case actionNames.SET_USER_SETTINGS_INPUT_FIELD:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        default:
            return state;
    }
}