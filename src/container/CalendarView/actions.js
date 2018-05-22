import moment from 'moment';

export const actionNames = {
    SET_CALENDARVIEW_DATE_OF_MONDAY: 'SET_CALENDARVIEW_DATE_OF_MONDAY'
}

export const actions = {
    setCalendarViewDateOfMonday: date =>({
        type: actionNames.SET_CALENDARVIEW_DATE_OF_MONDAY,
        payload: moment(moment(date).isoWeekday(1).format("YYYY-MM-DD")).valueOf()
    })
}