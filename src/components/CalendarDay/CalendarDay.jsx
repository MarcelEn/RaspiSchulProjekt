import React from 'react';
import style from './style_module.css';
import moment from 'moment';
import VerticalHourLegend from '../VerticalHourLegend/VerticalHourLegend';
import {getDayProgressionInPercent, getColorOfLetter } from '../../globalFunctions'
import Appointment from './Appointment';
import { millisecondsOfDay } from '../../constants';


const getTopMargin = date => (date - moment(moment(date).format("YYYY-MM-DD")).valueOf()) / millisecondsOfDay * 100 + "%"

const getHeight = (start, end) => {
    return (end - start) / millisecondsOfDay * 100 + "%"
}


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
            adjustAppointments(props.appointments).map(
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