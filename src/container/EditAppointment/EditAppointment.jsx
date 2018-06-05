import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactQuill from 'react-quill';

import { formats, modules } from '../../constants';
import { actions } from '../../actions';
import style from './style_module.css';
import { Grid, FormGroup, PageHeader, Form, FormControl, Col, Button, Alert, Collapse } from 'react-bootstrap';
import HorizontalFormElement from '../../components/HorizontalFormElement/HorizontalFormElement';
import { selectUserId, selectCalendarData, selectEditAppointmentUi, proxyToName, proxyToValue } from '../../globalFunctions';
import TimeSelect from '../../components/TimeSelect/TimeSelect';

class EditAppointment extends Component {
    constructor(props) {
        super(props);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleQuillInput = this.handleQuillInput.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
    }
    handleUserInput(proxy) {
        this.props.setEditAppointmentInputField(proxyToName(proxy), proxyToValue(proxy))
    }
    handleQuillInput(value) {
        this.props.setEditAppointmentInputField("appointment_description", value)
    }
    handleTimeChange(proxy) {
        const name = proxyToName(proxy).split("_")[0];
        const type = proxyToName(proxy).split("_")[1];
        const value = proxyToValue(proxy);
        const oldTimeStamp = moment(this.props.appointment[name]);
        switch (type) {
            case "date":
                const hoursAndMinutes = oldTimeStamp.valueOf() - moment(oldTimeStamp.format("YYYY-MM-DD")).valueOf();
                this.props.setEditAppointmentInputField(name, hoursAndMinutes + moment(value).valueOf())
                break;
            case "hour":
                // TODO
                // const newHours = parseInt(value, 10);
                
                // this.props.setEditAppointmentInputField(name,
                //     oldTimeStamp.add(newHours, "hour").valueOf()
                // )
                break;
            case "minute":
                break;
            default:
        }
    }
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
                        <FormControl
                            onChange={this.handleUserInput}
                            name="calendar_id"
                            value={[this.props.appointment.calendar_id]}
                            componentClass="select"
                            multiple
                            placeholder="Sie benötigen einen Kalender"
                        >
                            {
                                this.props.myCalendars.map(
                                    (calendar, index) =>
                                        <option
                                            key={"selectMyCalendar-" + index}
                                            value={calendar.calendar_id}>
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
                                name="start_date"
                                onChange={this.handleTimeChange}
                                value={moment(this.props.appointment.start).format("YYYY-MM-DD")}
                            />
                        </Col>
                        <Col xs={3}>
                            <TimeSelect
                                onChange={this.handleTimeChange}
                                name="start_hour"
                                value={moment(this.props.appointment.start).format("HH")}
                            />
                        </Col>
                        <Col xs={3}>
                            <TimeSelect
                                onChange={this.handleTimeChange}
                                name="start_minute"
                                value={moment(this.props.appointment.start).format("mm")}
                                type="minute"
                            />
                        </Col>
                    </HorizontalFormElement>
                    <HorizontalFormElement label="Ende">
                        <Col xs={6}>
                            <FormControl
                                type="date"
                                name=""
                                value={moment(this.props.appointment.end).format("YYYY-MM-DD")}
                            />
                        </Col>
                        <Col xs={3}>
                            <TimeSelect
                                value={moment(this.props.appointment.end).format("HH")}
                            />
                        </Col>
                        <Col xs={3}>
                            <TimeSelect
                                value={moment(this.props.appointment.end).format("mm")}
                                type="minute"
                            />
                        </Col>
                    </HorizontalFormElement>
                    <HorizontalFormElement label="Konflikt Filter">

                        {
                            this.props.calendarData.map(
                                (calendar, index) =>
                                    <Button
                                        className={style.buttonMargin}
                                        value={calendar.calendar_id}>
                                        {calendar.calendar_title}
                                    </Button>
                            )
                        }

                    </HorizontalFormElement>
                    <HorizontalFormElement label="Konflikte">
                        {/* {
                            this.props.calendarData.map(
                                (calendar, index) =>
                                    <Button
                                        className={style.buttonMargin}
                                        value={calendar.calendar_id}>
                                        {calendar.calendar_title}
                                    </Button>
                            )
                        } */}
                    </HorizontalFormElement>
                    <HorizontalFormElement label="Titel">
                        <FormControl
                            type="text"
                            placeholder="Titel"
                            value={this.props.appointment.appointment_title}
                            name="appointment_title"
                            onChange={this.handleUserInput}
                        />
                    </HorizontalFormElement>
                    <HorizontalFormElement label="Beschreibung">
                        <ReactQuill
                            theme={'snow'}
                            value={this.props.appointment.appointment_description}
                            onChange={this.handleQuillInput}
                            modules={modules}
                            formats={formats}
                            placeholder={'Füge eine Beschreibung hinzu.'}
                        />
                    </HorizontalFormElement>
                    <Collapse in={this.props.showInformation}>
                        <Col sm={5} smOffset={4}>
                            <Alert bsStyle="info">
                                Bitte alle Pflichtfelder* ausfüllen
                            </Alert>
                        </Col>
                    </Collapse>
                    <Collapse in={false}>
                        <Col sm={5} smOffset={4}>
                            <Alert bsStyle="danger">
                                <b>Whoops! </b>
                                <p>
                                    Da ist etwas schief gelaufen.
                                </p>
                            </Alert>
                        </Col>
                    </Collapse>
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
    const appointmentUi = selectEditAppointmentUi(state)
    // const conflicts = appointment.filter(
    //     appointment => 
    // )
    const showInformation = appointmentUi.appointment.appointment_title === "" ||
        appointmentUi.appointment.calendar_id === ""

    return {
        calendarData,
        myCalendars: calendarData.filter(calendar => calendar.owner_id === currentUser),
        savedCalendars: calendarData.filter(calendar => calendar.visibility === 2 && calendar.owner_id !== currentUser),
        appointment: appointmentUi.appointment,
        showInformation
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setEditAppointmentInputField: (name, value) => { dispatch(actions.setEditAppointmentInputField(name, value)) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAppointment)