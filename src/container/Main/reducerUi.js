import {
    actionNames
} from '../../actions';

import {
    getCalendarFilter
} from '../../globalFunctions';

export default (state = {
    activeCalendars: getCalendarFilter()
}, action) => {
    switch (action.type) {
        case actionNames.SET_MAIN_CALENDAR_FILTER:
            return {
                ...state,
                activeCalendars: action.payload
            }
        default:
            return state;
    }
}