import {
    actionNames
} from '../../actions';

export default (state = {
    popupId: null,
    showPopup: false,
    allowNotifications: false
}, action) => {
    switch (action.type) {
        case actionNames.CLOSE_POPUP:
            return {
                ...state,
                showPopup: false
            }
        case actionNames.SET_POPUP_ID:
            return {
                ...state,
                popupId: action.payload,
                showPopup: true
            }
        case actionNames.ALLOW_NOTIFICATIONS:
            return {
                ...state,
                allowNotifications: true
            }
        default:
            return state;
    }
}