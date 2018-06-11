import path from 'path';
import axios from 'axios';
import hash from 'hash.js';


const generateHash = string => hash.sha256().update(string).digest('hex');
const version = '1.0';
const apiPrefix = 'api';

const apiPaths = {
    whoAmI: path.resolve(apiPrefix, version, 'me'),
    sendRegistrationData: path.resolve(apiPrefix, version, 'authentification', 'register'),
    sendLoginData: path.resolve(apiPrefix, version, 'authentification', 'login'),
    sendLogout: path.resolve(apiPrefix, version, 'authentification', 'logout'),
    searchUsername: username => path.resolve(apiPrefix, version, 'rest', 'user?name=' + username),
    getUser: userId => path.resolve(apiPrefix, version, 'rest', 'user', userId),
    //TODO: This path is wrong
    userData: path.resolve(apiPrefix, version, 'rest', 'user_data'),
    validateToken: path.resolve(apiPrefix, version, 'authentification', 'test_token'),
    sendAddCalendarSearch: (searchString, userId) => path.resolve(apiPrefix, version, 'rest', 'calendar?search_string=' + searchString + '&user_id=' + userId),
    fetchSavedCalendars: path.resolve(apiPrefix, version, 'rest', 'calendar', 'saved'),
    addOrRemoveSavedCalendar: calendarId => path.resolve(apiPrefix, version, 'rest', 'calendar', 'saved', calendarId),
    updateOrAddCalendarData: path.resolve(apiPrefix, version, 'rest', 'calendar'),
    deleteCalendar: calendarId => path.resolve(apiPrefix, version, 'rest', 'calendar', calendarId),
    searchAppointmentsByCalendarId: (calendarId, after, before) => path.resolve(apiPrefix, version, 'rest', 'appointment?calendar_id=' + calendarId + '&after=' + after + "&before=" + before),
    deleteAppointmentById: appointmentId => path.resolve(apiPrefix, version, 'rest', 'appointment', appointmentId),
    addOrModifyAppointment: path.resolve(apiPrefix, version, 'rest', 'appointment'),
    changePassword: path.resolve(apiPrefix, version, 'authentification', 'password'),
    deleteOrUploadProfileImage: path.resolve(apiPrefix, version, 'user_data', 'picture'),
    getUserImageUrlByUsername: userName => path.resolve(apiPrefix, version, 'user_data', 'picture', userName),
}

export const getUserImageUrlByUsername = apiPaths.getUserImageUrlByUsername

export default {
    validateAppToken: () => (
        () => parser(axios.get(apiPaths.validateToken))
    ),
    sendLoginData: loginData => (
        () => axios.post(apiPaths.sendLoginData, {
            user_name: loginData.username,
            password_hash: generateHash(loginData.password),
            long_time: loginData.stayLoggedIn ? 1 : 0
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
        () => parser(axios.get(apiPaths.searchUsername(username)))
    ),

    sendAddCalendarSearch: (searchString, userId) => (
        () => parser(axios.get(apiPaths.sendAddCalendarSearch(searchString, userId)))
    ),
    updateCalendarData: calendarData => (
        () => axios.put(apiPaths.updateOrAddCalendarData, calendarData)
    ),
    deleteCalendar: calendarId => (
        () => axios.delete(apiPaths.deleteCalendar(calendarId))
    ),
    fetchUserDataById: userId => () => new Promise(
        (resolve, reject) => {
            return axios.all(
                    userId.map(
                        id => axios.get(apiPaths.getUser(id))
                    )
                )
                .then((...responses) => {
                    resolve(parser(responses))
                })
                .catch(e => {
                    reject(e);
                })
        }
    ),
    fetchSavedCalendars: () => parser(axios.get(apiPaths.fetchSavedCalendars)),
    whoAmI: () => parser(axios.get(apiPaths.whoAmI)),
    deleteSavedCalendar: calendarId => () => axios.delete(apiPaths.addOrRemoveSavedCalendar(calendarId)),
    addSavedCalendar: calendarId => () => axios.post(apiPaths.addOrRemoveSavedCalendar(calendarId)),
    searchAppointmentsByCalendarId: (calendarId, after, before) => parser(axios.get(apiPaths.searchAppointmentsByCalendarId(calendarId, after, before))),
    deleteAppointmentById: appointmentId => () => parser(axios.delete(apiPaths.deleteAppointmentById(appointmentId))),
    modifyAppointment: appointmentData => () => axios.put(apiPaths.addOrModifyAppointment, appointmentData),
    addAppointment: appointmentData => () => parser(axios.post(apiPaths.addOrModifyAppointment, appointmentData)),
    createCalendar: calendarData => () => axios.post(apiPaths.updateOrAddCalendarData, calendarData),
    changePassword: (oldPassword, newPassword) => () => axios.post(apiPaths.changePassword, {
        old_password_hash: generateHash(oldPassword),
        new_password_hash: generateHash(newPassword)
    }),
    updateUserData: userData => () => axios.post(apiPaths.userData, userData),
    uploadProfileImage: (data, config) => () => axios.put(apiPaths.deleteOrUploadProfileImage, data, config),
    deleteProfileImage: () => axios.delete(apiPaths.deleteOrUploadProfileImage)
}

const responseParser = (response) => {
    let parsedResponse = {};

    Object.keys(response).forEach(
        key => {
            if (key === 'visibility' || key === 'start' || key === 'end') {
                parsedResponse[key] = response[key];
                return;
            }
            parsedResponse[key] = response[key] + ""
        }
    )

    return parsedResponse;
}

const parser = promise => {
    return new Promise(
        (resolve, reject) => {
            promise
                .then(response => {
                    if (typeof response.data !== "object") {
                        resolve({
                            ...response,
                            data: response.data + ""
                        })
                    } else if (response.data.length) {
                        resolve({
                            ...response,
                            data: response.data.map(
                                res => responseParser(res)
                            )
                        })

                    } else {
                        resolve({
                            ...response,
                            data: responseParser(response.data)
                        })
                    }
                })
                .catch(e => reject(e))
        }
    )
}