import {
    put,
    select,
    call
} from 'redux-saga/effects';
import {
    actions
} from './../../actions';

import {
    getCalendarFilter,
    setCalendarFilter,
    selectDateOfMonday,
    selectCalendarData,
    selectUserId
} from '../../globalFunctions';

import API from './../../apiConnector';
import {
    millisecondsOfWeek
} from '../../constants';

export function* toggleMainCalendarFilter(action) {
    let currentCalendarFilter = getCalendarFilter();

    let fetch = false;

    if (currentCalendarFilter.find(calendarId => calendarId === action.payload)) {
        currentCalendarFilter = currentCalendarFilter.filter(calendarId => calendarId !== action.payload);
    } else {
        currentCalendarFilter = [...currentCalendarFilter, action.payload];
        fetch = true;
    }

    if (fetch) {
        const mondayOfThisWeek = yield select(selectDateOfMonday)
        const response = yield API.searchAppointmentsByCalendarId(action.payload, mondayOfThisWeek, mondayOfThisWeek + millisecondsOfWeek)
        yield put(actions.addAppointmentData(response.data))
    }

    setCalendarFilter(currentCalendarFilter);
    yield put(actions.setMainCalendarFilter(currentCalendarFilter));
}

const reomveCorruptedCharacters = str => {
    str+="";
    str = str.replace(";", "");
    return str.replace("\\n", "");
}

export function* downloadCalendar(action) {
    const calendar = (yield select(selectCalendarData)).find(calendar => calendar.calendar_id === action.payload)
    const appointments = yield call(() => API.searchAppointmentsByCalendarId(calendar.calendar_id, 0, new Date().valueOf() * 2));

    let csvData = "Eigentümer;Sichtbarkeit;Titel;Beschreibung\n";

    csvData += reomveCorruptedCharacters(calendar.owner_id) + ";" +
        reomveCorruptedCharacters(calendar.visibility) + ";" +
        reomveCorruptedCharacters(calendar.calendar_title) + ";" +
        reomveCorruptedCharacters(calendar.calendar_description) + "\n";

    csvData += "\n";

    csvData += "Titel;Beschreibung;Start;Ende\n";

    appointments.data.forEach(appointment => {
        csvData += reomveCorruptedCharacters(appointment.appointment_title) + ";" +
            reomveCorruptedCharacters(appointment.appointment_description) + ";" +
            reomveCorruptedCharacters(appointment.start) + ";" +
            reomveCorruptedCharacters(appointment.end) + "\n"
    });

    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(csvData));
    element.setAttribute('download', calendar.calendar_id + ".csv");

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

const getFile = () => {
    let element = document.createElement('input');

    element.setAttribute('type', "file");
    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    return new Promise(resolve => {
        element.onchange = event => {
            document.body.removeChild(element);
            resolve(URL.createObjectURL(event.target.files[0]))
        }
    })
}

const getFileData = file => {
    return new Promise((resolve, reject) => {
        let rawFile = new XMLHttpRequest();
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function () {
            if (rawFile.readyState === 4) {
                if (rawFile.status === 200 || rawFile.status === 0) {
                    resolve(rawFile.responseText.split("\n").map(line => line.split(";")))
                }
            }
        }
        rawFile.send(null);
    })
}


export function* uploadCalendar(action) {
    const file = yield call(getFile);
    const fileData = yield call(() => getFileData(file))
    const userId = yield select(selectUserId);
    
    try {

        const calendarData = {
            calendar_title: fileData[1][2],
            calendar_description: fileData[1][3],
            visibility: fileData[1][1],
            owner_id: userId
        }

        const calendarResponse = yield call(API.createCalendar(calendarData))
        const calendar_id = calendarResponse.data + "";
        yield put(actions.addCalendarData([{
            ...calendarData,
            calendar_id,
            owner_id: userId
        }]))
        let appointmentData;
        for (let i = 4; i < fileData.length - 1; i++) {
            appointmentData = {
                appointment_title: fileData[i][0],
                appointment_id: null,
                calendar_id,
                appointment_description: fileData[i][1],
                start: parseInt(fileData[i][2], 10),
                end: parseInt(fileData[i][3], 10),
            }
        
                const response = yield call(API.addAppointment(appointmentData));
                yield put(actions.addAppointmentData([{
                    ...appointmentData,
                    appointment_id: response.data + ""
                }]));
        }
    } catch (error) {

    }
}