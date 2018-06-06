import {
    actionNames
} from '../../actions';

export default (state = {
    calendar_title: "",
    visibility: 0,
    calendar_description: ""
}, action) => {
    switch (action.type) {
        case actionNames.SET_CREATE_CALENDAR_INPUT_FIELD:
            return {
                ...state,
                [action.payload.name]: action.payload.value
            }
        default:
            return state;
    }
}