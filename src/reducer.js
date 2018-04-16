import {
    combineReducers
} from 'redux';
import app from './container/App/reducer';
import login from './container/Login/reducer';


const data = combineReducers({
    login
});



export default combineReducers({
    data,
    ui: app
})