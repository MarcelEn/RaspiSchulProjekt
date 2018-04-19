import {
    combineReducers
} from 'redux';
import appData from './container/App/reducerData';
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
    registrationUi
})

export default combineReducers({
    data,
    ui
})