import {
    actionNames
} from '../../actions';

export default (state = {
    titleOrId: '',
    username: '',
    openedDescription: null,
    selected: []
}, action) => {
    switch (action.type) {
        case actionNames.TOGGLE_ADD_CALENDAR_SELECTION:
            let selected = [...state.selected];
            if (selected.find(selection => selection === action.payload)) {
                selected = selected.filter(selection => selection !== action.payload)
            } else {
                selected.push(action.payload);
            }
            return {
                ...state,
                selected
            }
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
                openedDescription: null,
                selected: []
            }
        default:
            return state;
    }
}