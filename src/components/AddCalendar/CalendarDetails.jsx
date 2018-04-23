import React from 'react';
import style from './style.css';
import { Button, Collapse, Well } from 'react-bootstrap';
import LoadingButton from '../LoadingButton/LoadingButton';

import { ClipLoader } from 'react-spinners';

const CalendarDetails = props => (
    <Well>

        {props.calendarData.calendar_title}

        <span className={style.alignRight}>
            {props.userData ?
                props.userData.user_name
                :
                <ClipLoader size={20} />
            }
        </span>
        {/* {props.userData.user_name} */}
    </Well>
)

export default CalendarDetails;