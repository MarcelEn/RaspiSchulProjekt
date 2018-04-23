import {
    actionNames
} from '../../actions';

export default (state = {
    popupId: 'ADD_CALENDAR'
}, action) => {
    switch (action.type) {
        case actionNames.CLOSE_POPUP:
            return {
                ...state,
                popupId: null
            }
        case actionNames.SET_POPUP_ID:
            return {
                ...state,
                popupId: action.payload
            }
        default:
            return state;
    }
}