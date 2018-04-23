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


const data = combineReducers({
    appData,
    loginData,
    registrationData,
    addCalendarData
});

const ui = combineReducers({
    loginUi,
    appUi,
    registrationUi,
    addCalendarUi
})

export default combineReducers({
    data,
    ui
})