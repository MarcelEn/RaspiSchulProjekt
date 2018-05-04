import React from 'react';
import style from './style_module.css';
import { Collapse, Row, Col, Button } from 'react-bootstrap';


import { ClipLoader } from 'react-spinners';
import CollapseArrow from '../CollapseArrow/CollapseArrow';
import ReactQuill from 'react-quill';
import ProfileImage from '../../container/ProfileImage/ProfileImage';

const CalendarDetails = props => (
    <div className={style.calendarBlock}>
        <Row className={style.verticalAlign}>
            <Col
                xs={1}
            >
                <CollapseArrow
                    isOpen={props.isOpen}
                    onClick={() => { props.handleDescriptionToggle(props.index) }}
                />
            </Col>
            <Col
                xs={9}
                sm={6}
                md={4}
                className={style.seperator}
                style={
                    {
                        borderRight: '1px solid rgb(222, 222, 222)'
                    }
                }
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
        </Row>
        <Collapse in={props.isOpen}>
            <div className={style.descirption}>
                <hr />
                <ReactQuill
                    value={props.calendarData.calendar_description}
                    theme="bubble"
                    readOnly
                />
            </div>
        </Collapse>
        <hr />
    </div>
)

export default CalendarDetails;