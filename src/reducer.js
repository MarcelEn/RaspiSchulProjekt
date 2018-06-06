import {
    combineReducers
} from 'redux';
import appData from './container/App/reducerData';
import appUi from './container/App/reducerUi';
import loginData from './container/Login/reducerData';
import loginUi from './container/Login/reducerUi';
import registrationData from './container/Registration/reducerData';
import registrationUi from './container/Registration/reducerUi';
import addCalendarData from './container/AddCalendar/reducerData';
import addCalendarUi from './container/AddCalendar/reducerUi';
import mainUi from './container/Main/reducerUi';
import manageCalendarData from './container/ManageCalendar/reducerData';
import manageCalendarUi from './container/ManageCalendar/reducerUi';
import calendarViewUi from './container/CalendarView/reducerUi';
import editAppointmentUi from './container/EditAppointment/reducerUi';
import editAppointmentData from './container/EditAppointment/reducerData';
import createCalendarUi from './container/CreateCalendar/reducerUi';
import createCalendarData from './container/CreateCalendar/reducerData';
import userSettingsUi from './container/UserSettings/reducerUi';
import userSettingsData from './container/UserSettings/reducerData';

const data = combineReducers({
    appData,
    loginData,
    registrationData,
    addCalendarData,
    manageCalendarData,
    editAppointmentData,
    createCalendarData,
    userSettingsData
});

const ui = combineReducers({
    loginUi,
    appUi,
    registrationUi,
    addCalendarUi,
    mainUi,
    manageCalendarUi,
    calendarViewUi,
    editAppointmentUi,
    createCalendarUi,
    userSettingsUi
})

export default combineReducers({
    data,
    ui
})