import React from 'react';
import moment from 'moment';
import style from './style_module.css';
import { Form, Col, FormControl, Button } from 'react-bootstrap';
import HorizontalFormElement from '../HorizontalFormElement/HorizontalFormElement';
import ReactQuill from 'react-quill';
import { formats, modules } from '../../constants';
import TimeSelect from '../TimeSelect/TimeSelect';

const AppointmentEditor = props => (
    <Form horizontal>
        <HorizontalFormElement label="Kalender">
            <FormControl value={[50002]} componentClass="select" multiple placeholder="Kalender">
                {
                    props.myCalendars.map(
                        (calendar, index) =>
                            <option key={"selectMyCalendar-" + index} value={calendar.calendar_id}>
                                {
                                    calendar.calendar_title
                                }
                            </option>
                    )
                }
                {
                    props.savedCalendars.length > 0 ?
                        <hr />
                        :
                        ''
                }
                {
                    props.savedCalendars.map(
                        (calendar, index) =>
                            <option key={"selectSavedCalendar-" + index} value={calendar.calendar_id}>
                                {
                                    calendar.calendar_title
                                }
                            </option>
                    )
                }
            </FormControl>
        </HorizontalFormElement>
        <HorizontalFormElement label="Start">
            <Col xs={6}>
                <FormControl
                    type="date"
                    name=""
                    value={moment(props.appointmentData.start).format("YYYY-MM-DD")}
                />
            </Col>
            <Col xs={3}>
                <TimeSelect
                    value={moment(props.appointmentData.start).format("hh")}
                />
            </Col>
            <Col xs={3}>
                <TimeSelect
                    value={moment(props.appointmentData.start).format("mm")}
                    type="minute"
                />
            </Col>
        </HorizontalFormElement>
        <HorizontalFormElement label="Ende">
            <Col xs={6}>
                <FormControl
                    type="date"
                    name=""
                    value={moment(props.appointmentData.end).format("YYYY-MM-DD")}
                />
            </Col>
            <Col xs={3}>
                <TimeSelect
                    value={moment(props.appointmentData.end).format("hh")}
                />
            </Col>
            <Col xs={3}>
                <TimeSelect
                    value={moment(props.appointmentData.end).format("mm")}
                    type="minute"
                />
            </Col>
        </HorizontalFormElement>
        <HorizontalFormElement label="Titel">
            <FormControl
                type="text"
                placeholder="Titel"
                value={props.appointmentData.appointment_title}
                name=""
            />
        </HorizontalFormElement>

        <HorizontalFormElement label="Beschreibung">
            <ReactQuill
                theme={'snow'}
                value={props.appointmentData.appointment_description}
                modules={modules}
                formats={formats}
                placeholder={'Füge eine Beschreibung hinzu.'}
            />
        </HorizontalFormElement>
        <HorizontalFormElement>
            <Button bsStyle="success">
                Speichern
            </Button>
        </HorizontalFormElement>
    </Form>
)

export default AppointmentEditor;