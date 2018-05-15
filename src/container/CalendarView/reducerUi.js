import {
    actionNames
} from '../../actions';

export default (state = {
}, action) => {
    switch (action.type) {
        case actionNames.SET_LOGIN_INPUT_FIELD:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        default:
            return state;
    }
}