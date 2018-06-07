import path from 'path';
import axios from 'axios';
import hash from 'hash.js';


const generateHash = string => hash.sha256().update(string).digest('hex');
const version = '1.0';
const apiPrefix = 'api';

const apiPaths = {
    sendRegistrationData: path.resolve(apiPrefix, version, 'authentification', 'register'),
    sendLoginData: path.resolve(apiPrefix, version, 'authentification', 'login'),
    sendLogout: path.resolve(apiPrefix, version, 'authentification', 'logout'),
    searchUsername: username => path.resolve(apiPrefix, version, 'rest', 'user?q=' + username),
    getUser: userId => path.resolve(apiPrefix, version, 'rest', 'user', userId),
    //TODO: This path is wrong
    userData: path.resolve(apiPrefix, version, 'rest', 'user_data'),
    validateToken: path.resolve(apiPrefix, version, 'authentification', 'test_token'),
    sendAddCalendarSearch: (searchString, userId) => path.resolve(apiPrefix, version, 'rest', 'calendar?search_string=' + searchString + '&user_id=' + userId),
    fetchSavedCalendars: path.resolve(apiPrefix, version, 'rest', 'calendar', 'saved'),
    addOrRemoveSavedCalendar: calendarId => path.resolve(apiPrefix, version, 'rest', 'calendar', 'saved', calendarId),
    updateOrAddCalendarData: path.resolve(apiPrefix, version, 'rest', 'calendar'),
    deleteCalendar: calendarId => path.resolve(apiPrefix, version, 'rest', 'calendar', calendarId),
    searchAppointmentsByCalendarId: calendarId => path.resolve(apiPrefix, version, 'rest', 'appointment?calendar_id=' + calendarId),
    deleteAppointmentById: appointmentId => path.resolve(apiPrefix, version, 'rest', 'appointment', appointmentId),
    addOrModifyAppointment: path.resolve(apiPrefix, version, 'rest', 'appointment'),
    changePassword: path.resolve(apiPrefix, version, 'authentification', 'password')
}


export default {
    validateAppToken: () => (
        () => axios.get(apiPaths.validateToken)
    ),
    sendLoginData: loginData => (
        () => axios.post(apiPaths.sendLoginData, {
            user_name: loginData.username,
            passwort_hash: generateHash(loginData.password)
        })
    ),
    sendLogout: () => (
        () => axios.delete(apiPaths.sendLogout)
    ),
    sendRegistrationData: registrationData => (
        () => axios.put(apiPaths.sendRegistrationData, {
            user_name: registrationData.username,
            first_name: registrationData.firstname,
            last_name: registrationData.lastname,
            password_hash: generateHash(registrationData.password),
            mail: registrationData.email
        })
    ),
    searchUsername: username => (
        () => axios.get(apiPaths.searchUsername(username))
    ),

    sendAddCalendarSearch: (searchString, userId) => (
        () => axios.get(apiPaths.sendAddCalendarSearch(searchString, userId))
    ),
    updateCalendarData: calendarData => (
        () => axios.post(apiPaths.updateOrAddCalendarData, calendarData)
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
    searchAppointmentsByCalendarId: calendarId => axios.get(apiPaths.searchAppointmentsByCalendarId(calendarId)),
    deleteAppointmentById: appointmentId => () => axios.delete(apiPaths.deleteAppointmentById(appointmentId)),
    modifyAppointment: appointmentData => () => axios.post(apiPaths.addOrModifyAppointment, appointmentData),
    addAppointment: appointmentData => () => axios.put(apiPaths.addOrModifyAppointment, appointmentData),
    createCalendar: calendarData => () => axios.put(apiPaths.updateOrAddCalendarData, calendarData),
    changePassword: (oldPassword, newPassword) => () => axios.post(apiPaths.changePassword, {
        old_password_hash: generateHash(oldPassword),
        new_password_hash: generateHash(newPassword)
    }),
    updateUserData: userData => () => axios.post(apiPaths.userData, userData),
}