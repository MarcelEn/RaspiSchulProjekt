import path from 'path';
import axios from 'axios';

const version = '0.0.1';
const apiPrefix = 'api'

const apiPaths = {
    sendLoginData: path.resolve(apiPrefix, version, 'account', 'login')
}


export default {
    sendLoginData: loginData => (
        () => axios.post(apiPaths.sendLoginData, {
            username: loginData.username,
            password: loginData.password
        })
    )
}