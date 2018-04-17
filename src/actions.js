import {actionNames as loginNames, actions as loginActions} from './container/Login/actions';
import {actionNames as registrationNames, actions as registrationActions} from './container/Registration/actions';


export const actionNames = {
    ...loginNames,
    ...registrationNames
}

export const actions = {
    ...loginActions,
    ...registrationActions
}