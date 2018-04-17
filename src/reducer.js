import {
    combineReducers
} from 'redux';
import app from './container/App/reducer';
import loginData from './container/Login/reducerData';
import registrationData from './container/Registration/reducerData';


const data = combineReducers({
    loginData,
    registrationData
});

const ui = combineReducers({
    app
})

export default combineReducers({
    data,
    ui
})