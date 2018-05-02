import {
    actionNames
} from '../../actions';

export default (state = {
    titleOrId: '',
    username: '',
    openedDescription: null
}, action) => {
    switch (action.type) {
        case actionNames.SET_ADD_CALENDAR_INPUT_FIELD:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        case actionNames.SET_ADD_CALENDAR_SHOW_DESCRIPTION:
            return {
                ...state,
                openedDescription: state.openedDescription === action.payload ? null : action.payload
            }
        case actionNames.APPLY_ADD_CALENDAR_RESPONSE:
            return {
                ...state,
                openedDescription: null
            }
        default:
            return state;
    }
}