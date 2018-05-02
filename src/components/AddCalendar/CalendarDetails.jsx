import React from 'react';
import style from './style_module.css';
import { Collapse, Well } from 'react-bootstrap';
import LoadingButton from '../LoadingButton/LoadingButton';

import { ClipLoader } from 'react-spinners';
import CollapseArrow from '../CollapseArrow/CollapseArrow';
import Card from '../Card/Card';


const CalendarDetails = props => (
    <Well>

        <CollapseArrow
            isOpen={props.isOpen}
            onClick={() => { props.handleDescriptionToggle(props.index) }}
        />

        {props.calendarData.calendar_title}

        <span className={style.alignRight}>
            {
                props.userData ?
                    props.userData.user_name
                    :
                    <ClipLoader size={20} />
            }
        </span>

        <Collapse in={props.isOpen}>
            <div>
                <Card>
                    {props.calendarData.calendar_description}
                </Card>
            </div>
        </Collapse>
    </Well>
)

export default CalendarDetails;