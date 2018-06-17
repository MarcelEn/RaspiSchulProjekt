import moment from 'moment';
import {
    millisecondsOfDay
} from './constants';
const alphabet = [
    'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', ' '
]


//Exports



export const getDayProgression = () => (moment().valueOf() - getTodayInMilliseconds()) / millisecondsOfDay

export const getDayProgressionInPercent = (date) => {
    const today = moment(moment().format('YYYY-MM-DD'))

    if (today.isBefore(date)) {
        return "100%";
    }
    if (today.isAfter(date)) {
        return "0%";
    }
    return (1 - getDayProgression()) * -100 - 10 + '%'
}

export const proxyToValue = proxy => proxy.target.value;

export const proxyToName = proxy => proxy.target.name;

export const nameValueToProxy = (name, value) => ({
    target: {
        name,
        value
    }
})

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return undefined;
}

export const selectUserSettingsUi = store => store.ui.userSettingsUi

export const selectUserSettingsData = store => store.data.userSettingsData

export const selectCreateCalendarUi = store => store.ui.createCalendarUi

export const selectCreateCalendarData = store => store.data.createCalendarData

export const selectUsers = store => store.data.appData.userData

export const selectCalendarData = store => store.data.appData.calendarData

export const selectAppointmentData = store => store.data.appData.appointmentData

export const selectEditAppointmentUi = store => store.ui.editAppointmentUi

export const selectEditAppointmentData = store => store.data.editAppointmentData

export const selectSavedCalendars = store => store.data.appData.savedCalendars

export const selectUserId = store => store.data.appData.userId

export const selectUserData = store => store.data.appData.userData

export const selectEditingCalendar = store => store.ui.manageCalendarUi.editingCalendar

export const selectActiveCalendar = store => store.ui.mainUi.activeCalendars

export const selectConflictFilterWhitelist = store => store.ui.editAppointmentUi.conflictFilterWhitelist

export const selectDetailedAppointmentId = store => store.ui.calendarViewUi.detailedAppointmentId

export const selectConfirmDeletion = store => store.ui.calendarViewUi.confirmDeletion

export const getTodayInMilliseconds = () => moment(moment().format("YYYY-MM-DD")).valueOf()

export const selectDateOfMonday = store => store.ui.calendarViewUi.dateOfMonday



//TODO: define media links

export const getColorOfLetter = (firstletter, lastletter) => {
    const combinedIndex =
        alphabet.indexOf(firstletter[0].toUpperCase()) +
        alphabet.indexOf(lastletter[0].toUpperCase())

    let colorRotatorPosition = 1;
    let colorRotator = [255, 0, 0];
    let colorRotatorSteps = 255 * 6 / alphabet.length;

    for (let i = 0; i < combinedIndex; i++) {
        switch (colorRotatorPosition) {
            case 1:
                colorRotator[1] += colorRotatorSteps;
                if (colorRotator[1] >= 255) {
                    colorRotator[1] = 255;
                    colorRotatorPosition++;
                    break;
                }
                break;
            case 2:
                colorRotator[0] -= colorRotatorSteps;
                if (colorRotator[0] <= 0) {
                    colorRotator[0] = 0;
                    colorRotatorPosition++;
                    break;
                }
                break;
            case 3:
                colorRotator[2] += colorRotatorSteps;
                if (colorRotator[2] >= 255) {
                    colorRotator[2] = 255;
                    colorRotatorPosition++;
                    break;
                }
                break;
            case 4:
                colorRotator[1] -= colorRotatorSteps;
                if (colorRotator[1] <= 0) {
                    colorRotator[1] = 0;
                    colorRotatorPosition++;
                    break;
                }
                break;
            case 5:
                colorRotator[0] += colorRotatorSteps;
                if (colorRotator[0] >= 255) {
                    colorRotator[0] = 255;
                    colorRotatorPosition++;
                    break;
                }
                break;
            case 6:
                colorRotator[2] -= colorRotatorSteps;
                if (colorRotator[2] <= 0) {
                    colorRotator[2] = 0;
                    colorRotatorPosition = 1;
                    break;
                }
                break;
            default:
                colorRotatorPosition = 1;
        }
    }


    return 'rgb(' + colorRotator[0] + ',' + colorRotator[1] + ',' + colorRotator[2] + ')';
}


export const getCalendarFilter = () => {
    try {
        return JSON.parse(localStorage.calendarFilter)
    } catch (e) {
        setCalendarFilter([]);
        return [];
    }

}
export const setCalendarFilter = array => {
    localStorage.setItem('calendarFilter', JSON.stringify(array))
}