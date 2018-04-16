import path from 'path';
import axios from 'axios';
import hash from 'string-hash';
const version = '0.0.1';
const apiPrefix = 'api'

const apiPaths = {
    sendLoginData: path.resolve(apiPrefix, version, 'account', 'login'),
    sendRegistrationData: path.resolve(apiPrefix, version, 'account', 'registrierung')
}


export default {
    sendLoginData: loginData => (
        () => axios.post(apiPaths.sendLoginData, {
            loginName: loginData.username,
            passwort: hash(loginData.password)
        })
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
}