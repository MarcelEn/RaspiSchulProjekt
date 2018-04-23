import {
    actionNames
} from '../../actions';

export default (state = {
    titleOrId: '',
    username: ''
}, action) => {
    switch (action.type) {
        case actionNames.SET_ADD_CALENDAR_INPUT_FIELD:
        return {
            ...state,
            [action.payload.name]: action.payload.value
        }
        default:
            return state;
    }
}