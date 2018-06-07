export const parseCalendarResponseData = calendarData => calendarData.map(
    c =>
    ({
        ...c,
        calendar_id: c.calendar_id + ""
    })
)