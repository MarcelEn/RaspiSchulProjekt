import {actionNames as loginNames, actions as loginActions} from './container/Login/actions';
import {actionNames as registrationNames, actions as registrationActions} from './container/Registration/actions';
import {actionNames as appNames, actions as appActions} from './container/App/actions';

export const actionNames = {
    ...loginNames,
    ...registrationNames,
    ...appNames
}

export const actions = {
    ...loginActions,
    ...registrationActions,
    ...appActions
}