import React from 'react';
import style from './style_module.css';
import moment from 'moment';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { getTodayInMilliseconds } from '../../globalFunctions';
import { millisecondsOfDay } from '../../constants';

const getTopMargin = date => 100 - (date - getTodayInMilliseconds()) / millisecondsOfDay * 100 + "%"

const getHeight = (start, end) => {
    return (end - start) / millisecondsOfDay * 100 + "%"
}

const Appointment = props => (
    <div style={
        {
            top: getTopMargin(props.appointment.start),
            height: getHeight(props.appointment.start, props.appointment.end),
            left: props.left,
            width: props.width
        }
    }
        className={style.appointment}>
        <OverlayTrigger
            placement="left"
            overlay={
                <Tooltip id="tooltip">
                    {props.appointment.appointment_title}
                </Tooltip>
            }
        >
            <div className={style.appointmentContent}>{props.appointment.appointment_title}</div>
        </OverlayTrigger>
    </div>
)

export default Appointment;