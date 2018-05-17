import React from 'react';
import style from './style_module.css';
import moment from 'moment';
import VerticalHourLegend from '../VerticalHourLegend/VerticalHourLegend';
import { getTodayInMilliseconds, getDayProgressionInPercent } from '../../globalFunctions'
import Appointment from './Appointment';


const example = {
    appointment_id: 49002,
    start: getTodayInMilliseconds() + 36000000,
    end: getTodayInMilliseconds() + 36000000 + 3600000,
    kalendar_id: '50002',
    appointment_title: 'Hallo',
    appointment_description: ''
}

const CalendarDate = props => (
    <div className={style.day}>
        <div className={style.lineWrapper}>
            <VerticalHourLegend day={props.legend} />
        </div>
        <div className={style.dayProgression} style={{ top: getDayProgressionInPercent(props.date) }} />

        <Appointment
            appointment={example}
            width="50%"
            left="0%"
        />

    </div>
)

export default CalendarDate;