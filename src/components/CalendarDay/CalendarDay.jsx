import React from 'react';
import style from './style_module.css';
import moment from 'moment';
import VerticalHourLegend from '../VerticalHourLegend/VerticalHourLegend';

const millisecondsOfDay = 1000 * 60 * 60 * 24;

const getDayProgression = () => (moment().valueOf() - moment(moment().format("YYYY-MM-DD")).valueOf()) / millisecondsOfDay

const getDayProgressionInPercent = (date) => {
    const today = moment(moment().format('YYYY-MM-DD'))

    if (today.isBefore(date)) {
        return "100%";
    }
    if (today.isAfter(date)) {
        return "0%";
    }
    return (1 - getDayProgression()) * - 100 - 10 + '%'
}


const CalendarDate = props => (
    <div className={style.day}>
        <div className={style.dayProgression} style={{ top: getDayProgressionInPercent(props.date) }} />
        <div className={style.lineWrapper}>
            <VerticalHourLegend day={props.day}/>
        </div>
    </div>
)

export default CalendarDate;