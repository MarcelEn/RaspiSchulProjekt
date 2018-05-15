import React from 'react';
import style from './style_module.css';


const CalendarDate = props => (
    <div className={style.CalendarDate}>
        {props.children}
    </div>
)

export default CalendarDate;