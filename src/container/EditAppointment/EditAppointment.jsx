import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import ReactQuill from 'react-quill';

import { formats, modules } from '../../constants';
import { actions } from '../../actions';
import style from './style_module.css';
import { Grid, FormGroup, PageHeader, Form, FormControl, Col, Button, Alert, Collapse } from 'react-bootstrap';
import HorizontalFormElement from '../../components/HorizontalFormElement/HorizontalFormElement';
import { selectUserId, selectCalendarData, selectEditAppointmentUi, selectAppointmentData, selectEditAppointmentData, proxyToName, proxyToValue } from '../../globalFunctions';
import TimeSelect from '../../components/TimeSelect/TimeSelect';
import LoadingButton from '../../components/LoadingButton/LoadingButton';

class EditAppointment extends Component {
    constructor(props) {
        super(props);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleQuillInput = this.handleQuillInput.bind(this);
        this.handleTimeChange = this.handleTimeChange.bind(this);
        this.getBsStyle = this.getBsStyle.bind(this);
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
        if (value === "") {
            return;
        }
        const oldTimeStamp = moment(this.props.appointment[name]);
        switch (type) {
            case "date":
                this.props.setEditAppointmentInputField(name,
                    moment(oldTimeStamp.format(`${value}THH:mm`)).valueOf()
                )
                break;
            case "hour":
                this.props.setEditAppointmentInputField(name,
                    moment(oldTimeStamp.format(`YYYY-MM-DDT${value}:mm`)).valueOf()
                )
                break;
            case "minute":
                this.props.setEditAppointmentInputField(name,
                    moment(oldTimeStamp.format(`YYYY-MM-DDTHH:${value}`)).valueOf()
                )
                break;
            default:
        }
    }
    getBsStyle(calendar) {
        if (this.props.conflictFilterWhitelist.find(item => item === calendar.calendar_id)) {
            return "success";
        }
        return "default";
    }
    render() {
        return (
            <Grid>
                <FormGroup>
                    <PageHeader>
                        Termin {this.props.appointment.appointment_id ? 'bearbeiten' : 'erstellen'}
                    </PageHeader>
                </FormGroup>
                <Form horizontal>
                    <HorizontalFormElement label="Kalender*">
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
                    <HorizontalFormElement validationState={this.props.invalidStartEnd ? 'error' : ''} label="Start*">
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
                    <HorizontalFormElement validationState={this.props.invalidStartEnd ? 'error' : ''} label="Ende*">
                        <Col xs={6}>
                            <FormControl
                                type="date"
                                name="end_date"
                                onChange={this.handleTimeChange}
                                value={moment(this.props.appointment.end).format("YYYY-MM-DD")}
                            />
                        </Col>
                        <Col xs={3}>
                            <TimeSelect
                                onChange={this.handleTimeChange}
                                name="end_hour"
                                value={moment(this.props.appointment.end).format("HH")}
                            />
                        </Col>
                        <Col xs={3}>
                            <TimeSelect
                                onChange={this.handleTimeChange}
                                name="end_minute"
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
                                        key={"conflictFilterButton-" + index}
                                        onClick={this.props.toggleEditAppointmentConflictFilterWhitelist}
                                        className={style.buttonMargin}
                                        value={calendar.calendar_id}
                                        bsStyle={this.getBsStyle(calendar)}
                                    >
                                        {calendar.calendar_title}
                                    </Button>
                            )
                        }

                    </HorizontalFormElement>
                    <HorizontalFormElement label="Konflikte">
                        <div className={style.conflictContainer}>
                            {
                                this.props.conflicts.map(
                                    (conflict, index) =>
                                        <Alert key={"conflict-" + index} bsStyle="danger">
                                            <b>{conflict.appointment_title}</b><br />
                                            @
                                            {moment(conflict.start).format("DD-MM-YYYY HH:mm")}
                                            {" - "}
                                            {moment(conflict.end).format("DD-MM-YYYY HH:mm")}
                                        </Alert>
                                )
                            }
                        </div>
                    </HorizontalFormElement>
                    <HorizontalFormElement label="Titel*">
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
                    <Collapse in={this.props.editAppointmentData.success}>
                        <Col sm={5} smOffset={4}>
                            <Alert bsStyle="success">
                                Die Daten wurden erfolgreich gespeichert.
                            </Alert>
                        </Col>
                    </Collapse>
                    <Collapse in={this.props.editAppointmentData.error}>
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
                        <LoadingButton loading={this.props.editAppointmentData.loading}>
                            <Button
                                disabled={this.props.showInformation}
                                onClick={this.props.submitEditAppointmentData}
                                bsStyle="success"
                            >
                                Speichern
                            </Button>
                        </LoadingButton>
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
    const appointmentData = selectAppointmentData(state);
    const editAppointmentData = selectEditAppointmentData(state);

    const conflicts = appointmentData.filter(
        appointment =>
            (
                moment(appointmentUi.appointment.start + 1).isBetween(appointment.start, appointment.end) ||
                moment(appointmentUi.appointment.end + 1).isBetween(appointment.start, appointment.end)
            ) &&
            appointmentUi.conflictFilterWhitelist.find(item => item === appointment.calendar_id) &&
            appointment.appointment_id !== appointmentUi.appointment.appointment_id
    )
    const invalidStartEnd = appointmentUi.appointment.start >= appointmentUi.appointment.end
    const showInformation = appointmentUi.appointment.appointment_title === "" ||
        appointmentUi.appointment.calendar_id === "" ||
        invalidStartEnd

    return {
        calendarData,
        myCalendars: calendarData.filter(calendar => calendar.owner_id === currentUser),
        savedCalendars: calendarData.filter(calendar => calendar.visibility === 2 && calendar.owner_id !== currentUser),
        appointment: appointmentUi.appointment,
        showInformation,
        conflictFilterWhitelist: appointmentUi.conflictFilterWhitelist,
        conflicts,
        invalidStartEnd,
        editAppointmentData
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setEditAppointmentInputField: (name, value) => { dispatch(actions.setEditAppointmentInputField(name, value)) },
        toggleEditAppointmentConflictFilterWhitelist: proxy => { dispatch(actions.toggleEditAppointmentConflictFilterWhitelist(proxyToValue(proxy))) },
        submitEditAppointmentData: () => { dispatch(actions.submitEditAppointmentData()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditAppointment)