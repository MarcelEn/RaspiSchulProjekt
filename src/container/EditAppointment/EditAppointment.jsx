import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactQuill from 'react-quill';

import { formats, modules } from '../../constants';
import style from './style_module.css';
import { Grid, FormGroup, PageHeader, Form, FormControl, Col, Button } from 'react-bootstrap';
import HorizontalFormElement from '../'
import { selectUserId, selectCalendarData, selectDetailedAppointmentId, selectAppointmentData } from '../../globalFunctions';
import TimeSelect from '../../components/TimeSelect/TimeSelect';

class EditAppointment extends Component {
    render() {
        return (
            <Grid>
                <FormGroup>
                    <PageHeader>
                        Termin bearbeiten
                    </PageHeader>
                </FormGroup>
                <Form horizontal>
                    <HorizontalFormElement label="Kalender">
                        <FormControl value={[50002]} componentClass="select" multiple placeholder="Kalender">
                            {
                                this.props.myCalendars.map(
                                    (calendar, index) =>
                                        <option key={"selectMyCalendar-" + index} value={calendar.calendar_id}>
                                            {
                                                calendar.calendar_title
                                            }
                                        </option>
                                )
                            }
                            {
                                this.props.savedCalendars.length > 0 ?
                                    <hr />
                                    :
                                    ''
                            }
                            {
                                this.props.savedCalendars.map(
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
                                value={moment(this.props.appointmentData.start).format("YYYY-MM-DD")}
                            />
                        </Col>
                        <Col xs={3}>
                            <TimeSelect
                                value={moment(this.props.appointmentData.start).format("hh")}
                            />
                        </Col>
                        <Col xs={3}>
                            <TimeSelect
                                value={moment(this.props.appointmentData.start).format("mm")}
                                type="minute"
                            />
                        </Col>
                    </HorizontalFormElement>
                    <HorizontalFormElement label="Ende">
                        <Col xs={6}>
                            <FormControl
                                type="date"
                                name=""
                                value={moment(this.props.appointmentData.end).format("YYYY-MM-DD")}
                            />
                        </Col>
                        <Col xs={3}>
                            <TimeSelect
                                value={moment(this.props.appointmentData.end).format("hh")}
                            />
                        </Col>
                        <Col xs={3}>
                            <TimeSelect
                                value={moment(this.props.appointmentData.end).format("mm")}
                                type="minute"
                            />
                        </Col>
                    </HorizontalFormElement>
                    <HorizontalFormElement label="Titel">
                        <FormControl
                            type="text"
                            placeholder="Titel"
                            value={this.props.appointmentData.appointment_title}
                            name=""
                        />
                    </HorizontalFormElement>

                    <HorizontalFormElement label="Beschreibung">
                        <ReactQuill
                            theme={'snow'}
                            value={this.props.appointmentData.appointment_description}
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
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    const currentUser = selectUserId(state);
    const calendarData = selectCalendarData(state);

    return {
        myCalendars: calendarData.filter(calendar => calendar.owner_id === currentUser),
        savedCalendars: calendarData.filter(calendar => calendar.visibility === 2 && calendar.owner_id !== currentUser),
        appointmentData: selectAppointmentData(state).find(appointment => appointment.appointment_id === selectDetailedAppointmentId(state))
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAppointment)