import React from 'react';
import style from './style_module.css';
import { Collapse, Well } from 'react-bootstrap';
import LoadingButton from '../LoadingButton/LoadingButton';

import { ClipLoader } from 'react-spinners';
import CollapseArrow from '../CollapseArrow/CollapseArrow';
import Card from '../Card/Card';
import ReactQuill from 'react-quill';
import ProfileImage from '../../container/ProfileImage/ProfileImage';

const CalendarDetails = props => (
    <Well className={style.transition}>
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

        <ProfileImage

        />

        <Collapse in={props.isOpen}>
            <div>
                <div className={style.descirption}>
                    <Card>
                        <ReactQuill
                            value={props.calendarData.calendar_description}
                            theme="bubble"
                            readOnly
                        />
                    </Card>
                </div>
            </div>
        </Collapse>
    </Well>
)

export default CalendarDetails;