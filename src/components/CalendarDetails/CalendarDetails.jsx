import React from 'react';
import style from './style_module.css';
import { Col, Button } from 'react-bootstrap';


import { ClipLoader } from 'react-spinners';
import ReactQuill from 'react-quill';
import ProfileImage from '../../container/ProfileImage/ProfileImage';

import SliderWithHeadingAndArrow from '../SliderWithHeadingAndArrow/SliderWithHeadingAndArrow.jsx';

const CalendarDetails = props => (
    <SliderWithHeadingAndArrow
        index={props.index}
        handleDescriptionToggle={props.handleDescriptionToggle}
        isOpen={props.isOpen}
        heading={
            <div>
                <Col
                    xs={9}
                    sm={6}
                    md={4}
                    className={style.seperator}
                >
                    <b>
                        {props.calendarData.calendar_title}
                    </b>
                </Col>
                {
                    props.userData ?
                        <Col
                            xsHidden
                            sm={3}
                            md={2}
                        >
                            {props.userData.first_name + ' ' + props.userData.last_name}
                        </Col>
                        :
                        ''
                }
                {
                    props.userData ?
                        <Col
                            xsHidden
                            smHidden
                            md={2}
                        >
                            {props.userData.user_name}
                        </Col>
                        :
                        ''
                }
                {
                    props.userData ?
                        <Col
                            xsHidden
                            smHidden
                            md={1}
                        >
                            <ProfileImage
                                firstname={props.userData.first_name}
                                lastname={props.userData.last_name}
                                username={props.userData.user_name}
                            />
                        </Col>

                        :
                        <Col
                            xsHidden
                            sm={3}
                            md={5}
                        >
                            <div className={style.loadingIndicator}>
                                <ClipLoader size={20} />
                            </div>
                        </Col>
                }
                <Col
                    xs={2}
                >
                    <Button
                        onClick={props.handleSelection}
                        value={props.calendarData.calendar_id}
                        bsStyle={props.selected ? 'success' : 'default'}
                    >
                        {
                            props.selected ? '-' : '+'
                        }
                    </Button>
                </Col>
            </div>
        }
        descirption={
            <ReactQuill
                value={props.calendarData.calendar_description}
                theme="bubble"
                readOnly
            />
        }
    />
)

export default CalendarDetails;