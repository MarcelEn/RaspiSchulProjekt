import React from 'react';
import style from './style_module.css';
import moment from 'moment';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';


const Appointment = props => (
    <div style={props.style}
        className={style.appointment}>
        <OverlayTrigger
            placement="left"
            overlay={
                <Tooltip id="tooltip">
                    {props.appointment.appointment_title}
                </Tooltip>
            }
        >
            <div
                className={style.appointmentContent}
                onClick={() => {props.handleAppointmentSelect(props.appointment.appointment_id)}}
            >
                {props.appointment.appointment_title}
            </div>
        </OverlayTrigger>
    </div>
)

export default Appointment;