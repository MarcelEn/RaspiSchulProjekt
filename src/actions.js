import {actionNames as loginNames, actions as loginActions} from './container/Login/actions';
import {actionNames as registrationNames, actions as registrationActions} from './container/Registration/actions';
import {actionNames as appNames, actions as appActions} from './container/App/actions';
import {actionNames as addCalendarNames, actions as addCalendarActions} from './container/AddCalendar/actions';
import {actionNames as mainNames, actions as mainActions} from './container/Main/actions';
import {actionNames as manageCalendarNames, actions as manageCalendarActions} from './container/ManageCalendar/actions';
import {actionNames as calendarViewNames, actions as calendarViewActions} from './container/CalendarView/actions';
import {actionNames as editAppointmentNames, actions as editAppointmentActions} from './container/EditAppointment/actions';
import {actionNames as createCalendarNames, actions as createCalendarActions} from './container/CreateCalendar/actions';
import {actionNames as userSettingsNames, actions as userSettingsActions} from './container/UserSettings/actions';

export const actionNames = {
    ...loginNames,
    ...registrationNames,
    ...appNames,
    ...addCalendarNames,
    ...mainNames,
    ...manageCalendarNames,
    ...calendarViewNames,
    ...editAppointmentNames,
    ...createCalendarNames,
    ...userSettingsNames
}

export const actions = {
    ...loginActions,
    ...registrationActions,
    ...appActions,
    ...addCalendarActions,
    ...mainActions,
    ...manageCalendarActions,
    ...calendarViewActions,
    ...editAppointmentActions,
    ...createCalendarActions,
    ...userSettingsActions
}