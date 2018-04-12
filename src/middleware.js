import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios';
import {actions, actionNames} from './actions';


const apiBasePath = '/api';

const apiPaths = {
    time: apiBasePath + '/time'
}

const api = {
    getServerTime: () => axios.get(apiPaths.time)
}

function* fetchUser(action) {
   try {
      const response = yield call(api.getServerTime);
      const time = response.data;
      yield put(actions.applyServerSideTime(time));
   } catch (e) {
      yield put(actions.applyServerSideTime('error'));
   }
}

function* mySaga() {
  yield takeLatest(actionNames.FETCH_SERVER_SIDE_TIME, fetchUser);
}

export default mySaga;