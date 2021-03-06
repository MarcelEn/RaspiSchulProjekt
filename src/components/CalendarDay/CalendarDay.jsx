import React from 'react';
import style from './style_module.css';
import moment from 'moment';
import VerticalHourLegend from '../VerticalHourLegend/VerticalHourLegend';
import { getDayProgressionInPercent, getColorOfLetter } from '../../globalFunctions'
import Appointment from './Appointment';
import { millisecondsOfDay } from '../../constants';


// const getTopMargin = date => (date - moment(moment(date).format("YYYY-MM-DD")).valueOf()) / millisecondsOfDay * 100 + "%"

// const getHeight = (start, end) => {
//     return (end - start) / millisecondsOfDay * 100 + "%"
// }

// const getWidth = appointment => {
//     const sl = appointment.startConflicts.length;
//     const el = appointment.endConflicts.length;
//     const addition = sl === 0 || el === 0 ? 1 : 0
//     return 100 / (sl + el + addition)
// }

// const getMarginLeft = appointment => {
//     let diff = appointment.startConflicts.length - appointment.endConflicts.length;
//     if (diff < 0) {
//         diff *= -1;
//     }
//     if (diff === 0) {
//         diff = 1;
//     }
//     return 100 / diff
// }

// const orderByStart = appointments => appointments.sort((a1, a2) => a1.start > a2.start)


// const adjustAppointments = appointments => {
//     console.log(appointments)
//     let alreadyMappedAppointments = [];
//     const appointmentsWithConflictData = orderByStart(appointments).map(data => {

//         const startConflicts = appointments.filter(appointment =>
//             moment(data.start).isBetween(appointment.start - 1, appointment.end + 1) &&
//             data.appointment_id !== appointment.appointment_id
//         )

//         const endConflicts = appointments.filter(appointment =>
//             moment(data.end).isBetween(appointment.start - 1, appointment.end + 1) &&
//             data.appointment_id !== appointment.appointment_id
//         )


//         const leftIndex = alreadyMappedAppointments.filter(appointment =>
//             moment(data.start).isBetween(appointment.start - 1, appointment.end + 1) ||
//             moment(data.end).isBetween(appointment.start - 1, appointment.end + 1)
//         ).length;

//         alreadyMappedAppointments.push(data);

//         return {
//             data,
//             leftIndex,
//             startConflicts,
//             endConflicts
//         }
//     })
//     return appointmentsWithConflictData.map((appointment, index) => {
//         const width = getWidth(appointment);

//         let marginLeft;

//         if (index === 0) {
//             marginLeft = 0;
//         } else {
//             // const startConflictIndex = appointmentsWithConflictData[index - 1].startConflicts
//             //     .map(
//             //         conflict => conflict.appointment_id
//             //     )
//             //     .indexOf(appointment.data.appointment_id) + 1

//             const endConflictIndex = appointmentsWithConflictData[index - 1].endConflicts
//                 .map(
//                     conflict => conflict.appointment_id
//                 )
//                 .indexOf(appointment.data.appointment_id) + 1
//             marginLeft = 100 - 100 / (endConflictIndex - appointmentsWithConflictData[index - 1].startConflicts.length + 1)
//         }
//         return {
//             data: appointment.data,
//             style: {
//                 top: getTopMargin(appointment.data.start),
//                 height: getHeight(appointment.data.start, appointment.data.end),
//                 left: marginLeft + "%",
//                 width: width + "%",
//                 backgroundColor: getColorOfLetter(appointment.data.appointment_title[0] + "", appointment.data.appointment_title[1] + "")
//             }
//         }
//     })
// }

const getTopMargin = date => (date - moment(moment(date).format("YYYY-MM-DD")).valueOf()) / millisecondsOfDay * 100 + "%"

const getHeight = (start, end) => {
    return (end - start) / millisecondsOfDay * 100 + "%"
}

const orderBySize = appointments => appointments.sort(
    (a1, a2) =>
        a1.end - a1.start < a2.end - a2.start
)

const adjustAppointments = appointments => {
    let alreadyMappedAppointments = [];
    return orderBySize(appointments).map(data => {

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