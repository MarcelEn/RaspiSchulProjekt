import {
    put,
    call,
    select
} from 'redux-saga/effects';
import API from './../../apiConnector';
import {
    actions
} from './../../actions';


const getUsers = store => store.data.appData.userData


export function* sendAddCalendarSearch(action) {
    const userData = yield select(getUsers);

    yield put(actions.setAddCalendarLoading(true));
    yield put(actions.setAddCalendarError(true))

    yield put(actions.applyAddCalendarResponse([]))


    try {
        let userId = userData.find(user => user.user_name === action.payload.username);
        
        if(!userId){
            userId = ''
        }else{
            userId = userId.user_id;
        }

        if (action.payload.username !== '' && userId === '') {

            const userSearchResponse = yield call(API.searchUsername(action.payload.username));

            for (let i = 0; i < userSearchResponse.data.length; i++) {
                yield put(actions.addUserData(userSearchResponse.data[i]))
            }

            userId = userSearchResponse.data.find(user => user.user_name === action.payload.username).user_id;
        }
        const response = yield call(API.sendAddCalendarSearch(action.payload.titleOrId, userId))
        yield put(actions.applyAddCalendarResponse(response.data))

    } catch (error) {
        
        yield put(actions.setAddCalendarError(true))

    }


    yield put(actions.setAddCalendarLoading(false));
}