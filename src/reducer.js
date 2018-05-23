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
import mainData from './container/Main/reducerData';
import mainUi from './container/Main/reducerUi';
import manageCalendarData from './container/ManageCalendar/reducerData';
import manageCalendarUi from './container/ManageCalendar/reducerUi';
import calendarViewUi from './container/CalendarView/reducerUi';

const data = combineReducers({
    appData,
    loginData,
    registrationData,
    addCalendarData,
    mainData,
    manageCalendarData
});

const ui = combineReducers({
    loginUi,
    appUi,
    registrationUi,
    addCalendarUi,
    mainUi,
    manageCalendarUi,
    calendarViewUi
})

export default combineReducers({
    data,
    ui
})