import React from 'react';
import style from './style_module.css';
import { Collapse, Well, Row, Col } from 'react-bootstrap';


import { ClipLoader } from 'react-spinners';
import CollapseArrow from '../CollapseArrow/CollapseArrow';
import Card from '../Card/Card';
import ReactQuill from 'react-quill';
import ProfileImage from '../../container/ProfileImage/ProfileImage';

const CalendarDetails = props => (
    <Well className={style.transition}>
        <Row>
            <Col
                xs={1}
                sm={1}
                md={1}
                lg={1}
            >
                <CollapseArrow
                    isOpen={props.isOpen}
                    onClick={() => { props.handleDescriptionToggle(props.index) }}
                />
            </Col>
            <Col
                xs={5}
                sm={5}
                md={6}
                lg={6}
            >
                <b>
                    {props.calendarData.calendar_title}
                </b>
            </Col>
            {
                props.userData ?
                    <Col
                        xs={6}
                        sm={6}
                        md={3}
                        lg={3}
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
                        lg={2}
                    >
                        <ProfileImage
                            firstname={props.userData.first_name}
                            lastname={props.userData.last_name}
                            username={props.userData.user_name}
                        />
                    </Col>

                    :
                    <Col
                        xs={3}
                        sm={3}
                        md={6}
                        lg={6}
                    >
                        <ClipLoader size={20} />
                    </Col>
            }
        </Row>
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