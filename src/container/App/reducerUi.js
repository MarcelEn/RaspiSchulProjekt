import {
    actionNames
} from '../../actions';

import {
    getCookie
} from '../../globalFunctions';

export default (state = {
    popupId: null
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