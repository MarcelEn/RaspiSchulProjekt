import {
    combineReducers
} from 'redux';
import app from './container/App/reducer';
import {actionNames} from './actions';


const data = (state = {
    serverSideTime: null
}, action) => {
    switch (action.type) {
        case actionNames.APPLY_SERVER_SIDE_TIME:
        return {
            ...state,
            serverSideTime: action.payload
        }
        default: return state;
    }
}



export default combineReducers({
    data,
    ui: app
})