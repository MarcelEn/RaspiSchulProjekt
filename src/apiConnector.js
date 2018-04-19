import path from 'path';
import axios from 'axios';
import hash from 'string-hash';

const version = '0.0.1';
const apiPrefix = 'api'

const apiPaths = {
    sendLoginData: path.resolve(apiPrefix, version, 'account', 'login', 'loginData'),
    sendLogout: path.resolve(apiPrefix, version, 'account', 'logout'),
    sendRegistrationData: path.resolve(apiPrefix, version, 'account', 'registrierung'),
    searchUsername: username => path.resolve(apiPrefix, version, 'nutzer?q=' + username),
    validateToken: path.resolve(apiPrefix, version, 'account', 'login', 'token'),
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
    )
}