import {
    put,
    call,
    select
} from 'redux-saga/effects';

import API from './../../apiConnector';

import {
    actions
} from './../../actions';

import {
    selectUsers,
    selectSavedCalendars
} from '../../globalFunctions'


export function* sendAddCalendarSearch(action) {

    const userData = yield select(selectUsers);
    yield put(actions.setAddCalendarLoading(true));
    yield put(actions.setAddCalendarError(false))

    yield put(actions.applyAddCalendarResponse([]))

    try {
        let userId = userData.find(user => user.user_name.toUpperCase() === action.payload.username.toUpperCase());

        if (!userId) {
            userId = ''
        } else {
            userId = userId.user_id;
        }

        if (action.payload.username !== '' && userId === '') {

            const userSearchResponse = yield call(API.searchUserByUsername(action.payload.username));

            for (let i = 0; i < userSearchResponse.data.length; i++) {
                yield put(actions.addUserData(userSearchResponse.data[i]))
            }
            let user = userSearchResponse.data.find(user => user.user_name.toUpperCase() === action.payload.username.toUpperCase());
            if(!user){
                yield put(actions.applyAddCalendarResponse([]))
                yield put(actions.setAddCalendarLoading(false));
                return;        
            }
            userId = user.user_id;
        }
        const response = yield call(API.sendAddCalendarSearch(action.payload.titleOrId, userId))
        yield put(actions.addCalendarData(response.data))
        yield put(actions.applyAddCalendarResponse(response.data.map(calendar => calendar.calendar_id)))

    } catch (error) {
        console.log(error)
        yield put(actions.setAddCalendarError(true))

    }


    yield put(actions.setAddCalendarLoading(false));
}

export function* toggleAddCalendarSelection(action) {
    const savedCalendars = yield select(selectSavedCalendars)
    if (savedCalendars.find(savedId => savedId === action.payload)) {
        try {
            yield call(API.deleteSavedCalendar(action.payload))
            yield put(actions.removeSavedCalendar(action.payload))
        } catch (error) {}
    } else {
        try {
            yield call(API.addSavedCalendar(action.payload))
            //TODO: (make it better) we make this check because the user could press the button multiple times
            if (!savedCalendars.find(savedId => savedId === action.payload)) {
                yield put(actions.addSavedCalendar(action.payload))
            }
        } catch (error) {}
    }
}