import {actionNames as loginNames, actions as loginActions} from './container/Login/actions';
import {actionNames as registrationNames, actions as registrationActions} from './container/Registration/actions';
import {actionNames as appNames, actions as appActions} from './container/App/actions';
import {actionNames as addCalendarNames, actions as addCalendarActions} from './container/AddCalendar/actions';

export const actionNames = {
    ...loginNames,
    ...registrationNames,
    ...appNames,
    ...addCalendarNames
}

export const actions = {
    ...loginActions,
    ...registrationActions,
    ...appActions,
    ...addCalendarActions
}