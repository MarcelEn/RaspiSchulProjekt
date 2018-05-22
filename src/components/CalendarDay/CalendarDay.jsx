import React from 'react';
import style from './style_module.css';
import moment from 'moment';
import VerticalHourLegend from '../VerticalHourLegend/VerticalHourLegend';
import { getTodayInMilliseconds, getDayProgressionInPercent, getColorOfLetter } from '../../globalFunctions'
import Appointment from './Appointment';
import { millisecondsOfDay } from '../../constants';


const getTopMargin = date => (date - getTodayInMilliseconds()) / millisecondsOfDay * 100 + "%"

const getHeight = (start, end) => {
    return (end - start) / millisecondsOfDay * 100 + "%"
}

const example = [{
    appointment_id: 49002,
    start: getTodayInMilliseconds() + 36000000,
    end: getTodayInMilliseconds() + 36000000 + 3600000,
    kalendar_id: '50002',
    appointment_title: 'Hallo',
    appointment_description: ''
},
{
    appointment_id: 49002,
    start: getTodayInMilliseconds() + 36000000,
    end: getTodayInMilliseconds() + 36000000 + 3600000,
    kalendar_id: '50002',
    appointment_title: 'Ich bin ein ganz wichtiger Termin',
    appointment_description: ''
},
{
    appointment_id: 49002,
    start: getTodayInMilliseconds() + 30000000,
    end: getTodayInMilliseconds() + 35999999,
    kalendar_id: '50002',
    appointment_title: 'Mop',
    appointment_description: ''
}]


const adjustAppointments = appointments => {
    let alreadyMappedAppointments = [];
    return appointments.map(data => {

        const leftIndex = alreadyMappedAppointments.filter(appointment =>
            moment(data.start).isBetween(appointment.start - 1, appointment.end + 1) ||
            moment(data.end).isBetween(appointment.start - 1, appointment.end + 1)
        ).length;

        alreadyMappedAppointments.push(data);

        return {
            data,
            leftIndex
        }
    }).map(appointment => {
        const widthIndexCount = alreadyMappedAppointments.filter(alreadyMappedAppointment =>
            moment(appointment.data.start).isBetween(alreadyMappedAppointment.start - 1, alreadyMappedAppointment.end + 1) ||
            moment(appointment.data.end).isBetween(alreadyMappedAppointment.start - 1, alreadyMappedAppointment.end + 1)
        ).length;
        return {
            data: appointment.data,
            style: {
                top: getTopMargin(appointment.data.start),
                height: getHeight(appointment.data.start, appointment.data.end),
                left: appointment.leftIndex * 100 / widthIndexCount + "%",
                width: 100 / widthIndexCount + "%",
                backgroundColor: getColorOfLetter(appointment.data.appointment_title[0] + "", appointment.data.appointment_title[1] + "")
            }
        }
    })
}

const CalendarDate = props => (
    <div className={style.day}>
        <div className={style.lineWrapper}>
            <VerticalHourLegend day={props.legend} />
        </div>
        <div className={style.dayProgression} style={{ top: getDayProgressionInPercent(props.date) }} />
        {
            adjustAppointments(example).map(
                (appointment, index) =>
                    <Appointment
                        key={"CalendarDay-" + props.day + "-" + index}
                        appointment={appointment.data}
                        style={appointment.style}
                        handleAppointmentSelect={props.handleAppointmentSelect}
                    />
            )
        }
    </div>
)

export default CalendarDate;