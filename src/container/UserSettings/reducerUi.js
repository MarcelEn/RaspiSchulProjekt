import {
    actionNames
} from '../../actions';

export default (state = {
    userName: "",
    firstName: "",
    lastName: "",
    mail: "",
    oldPassword: "",
    newPassword: "",
    newPasswordRepeat: "",
    profileImage: undefined
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