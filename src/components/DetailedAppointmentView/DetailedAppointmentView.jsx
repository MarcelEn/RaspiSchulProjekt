import React from 'react';
import style from './style_module.css';
import ReactQuill from 'react-quill';

const DetailedAppointmentView = props => (
    <div>
        <div className={style.heading}>
            {props.appointment_title}
        </div>
        <div>
            <ReactQuill
                value={props.appointment_description}
                theme="bubble"
                readOnly
            />
        </div>
    </div>
)

export default DetailedAppointmentView;