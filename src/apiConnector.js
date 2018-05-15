import path from 'path';
import axios from 'axios';
import hash from 'string-hash';

const version = '0.0.1';
const apiPrefix = 'api'

const apiPaths = {
    sendLoginData: path.resolve(apiPrefix, version, 'account', 'login', 'loginData'),
    sendLogout: path.resolve(apiPrefix, version, 'account', 'logout'),
    sendRegistrationData: path.resolve(apiPrefix, version, 'account', 'registrierung'),
    searchUsername: username => path.resolve(apiPrefix, version, 'rest', 'user?q=' + username),
    getUser: userId => path.resolve(apiPrefix, version, 'rest', 'user', userId),
    validateToken: path.resolve(apiPrefix, version, 'account', 'login', 'token'),
    sendAddCalendarSearch: (searchString, userId) => path.resolve(apiPrefix, version, 'rest', 'calendar?search_string=' + searchString + '&user_id=' + userId),
    fetchSavedCalendars: path.resolve(apiPrefix, version, 'rest', 'calendar', 'saved'),
    addOrRemoveSavedCalendar: calendarId => path.resolve(apiPrefix, version, 'rest', 'calendar', 'saved', calendarId),
    updateCalendarData: path.resolve(apiPrefix, version, 'rest', 'calendar'),
    deleteCalendar: calendarId => path.resolve(apiPrefix, version, 'rest', 'calendar', calendarId)
}


export default {
    validateAppToken: () => (
        () => axios.post(apiPaths.validateToken)
    ),
    sendLoginData: loginData => (
        () => axios.post(apiPaths.sendLoginData, {
            loginName: loginData.username,
            passwort: hash(loginData.password)
        })
    ),
    sendLogout: () => (
        () => axios.delete(apiPaths.sendLogout)
    ),
    sendRegistrationData: registrationData => (
        () => axios.post(apiPaths.sendRegistrationData, {
            loginName: registrationData.username,
            vorname: registrationData.firstname,
            nachname: registrationData.lastname,
            password: hash(registrationData.password),
            email: registrationData.email
        })
    ),
    searchUsername: username => (
        () => axios.get(apiPaths.searchUsername(username))
    ),

    sendAddCalendarSearch: (searchString, userId) => (
        () => axios.get(apiPaths.sendAddCalendarSearch(searchString, userId))
    ),
    updateCalendarData: calendarData => (
        () => axios.post(apiPaths.updateCalendarData, calendarData)
    ),
    deleteCalendar: calendarId => (
        () => axios.delete(apiPaths.deleteCalendar(calendarId))
    ),
    fetchUserDataById: userId => () => new Promise(
        (resolve, reject) => axios.all(
            userId.map(
                id => axios.get(apiPaths.getUser(id))
            )
        )
        .then((...responses) => {
            resolve(responses)
        })
        .catch(e => {
            reject(e);
        })
    ),
    fetchSavedCalendars: () => axios.get(apiPaths.fetchSavedCalendars),
    deleteSavedCalendar: calendarId => () => axios.delete(apiPaths.addOrRemoveSavedCalendar(calendarId)),
    addSavedCalendar: calendarId => () => axios.put(apiPaths.addOrRemoveSavedCalendar(calendarId)),
}