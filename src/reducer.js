import {
    combineReducers
} from 'redux';
import appData from './container/App/reducerData';
import appUi from './container/App/reducerUi';
import loginData from './container/Login/reducerData';
import loginUi from './container/Login/reducerUi';
import registrationData from './container/Registration/reducerData';
import registrationUi from './container/Registration/reducerUi';


const data = combineReducers({
    appData,
    loginData,
    registrationData,
    
});

const ui = combineReducers({
    loginUi,
    appUi,
    registrationUi
})

export default combineReducers({
    data,
    ui
})