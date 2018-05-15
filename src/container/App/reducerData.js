import {
    actionNames
} from '../../actions';

import {
    getCookie
} from '../../globalFunctions';

export default (state = {
    tokenIsSet: getCookie('accessToken') ? true : false,
    firstInit: false,
    userData: [],
    calendarData: [],
    savedCalendars: [],
    tokenIsValidated: false,
    tokenLoading: false,
    tokenError: false,
    logoutLoading: false,
    userId: null
}, action) => {
    switch (action.type) {
        case actionNames.SET_APP_TOKEN_IS_SET:
            return {
                ...state,
                tokenIsSet: action.payload
            }
        case actionNames.SET_APP_TOKEN_IS_VALIDATED:
            return {
                ...state,
                tokenIsValidated: action.payload
            }
        case actionNames.SET_APP_TOKEN_LOADING:
            return {
                ...state,
                tokenLoading: action.payload
            }
        case actionNames.SET_APP_TOKEN_ERROR:
            return {
                ...state,
                tokenError: action.payload
            }
        case actionNames.SET_LOGOUT_LOADING:
            return {
                ...state,
                logoutLoading: action.payload
            }
        case actionNames.UPDATE_SAVED_CALENDARS:
            return {
                ...state,
                savedCalendars: action.payload
            }
        case actionNames.REMOVE_SAVED_CALENDAR:
            return {
                ...state,
                savedCalendars: state.savedCalendars.filter(savedCalendar => savedCalendar !== action.payload)
            }
        case actionNames.ADD_SAVED_CALENDAR:
            return {
                ...state,
                savedCalendars: [
                    ...state.savedCalendars,
                    action.payload
                ]
            }
        case actionNames.ADD_USER_DATA:
            const index = state.userData.findIndex(user => user.user_id === action.payload.user_id);
            if (index === -1) {
                return {
                    ...state,
                    userData: [...state.userData, action.payload]
                }
            } else {
                let newUserData = [...state.userData];
                newUserData[index] = action.payload
                return {
                    ...state,
                    userData: newUserData
                }
            }
        case actionNames.ADD_CALENDAR_DATA:
            const newCalendarData = action.payload.filter(
                calendar => !state.calendarData.find(c => c.calendar_id === calendar.calendar_id)
            )
            return {
                ...state,
                calendarData: [
                    ...state.calendarData,
                    ...newCalendarData
                ]
            }
        case actionNames.REMOVE_CALENDAR_DATA_BY_ID:
            const calendarData = state.calendarData.filter(
                c => c.calendar_id !== action.payload
            )
            return {
                ...state,
                calendarData
            }
        case actionNames.SET_USER_ID:
            return {
                ...state,
                userId: action.payload
            }
        case actionNames.SET_FIRST_INIT_IS_DONE:
            return {
                ...state,
                firstInit: true
            }
        default:
            return state;
    }
}