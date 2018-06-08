import React, { Component } from 'react';
import { connect } from 'react-redux';

import ReactQuill from 'react-quill';
import { formats, modules } from '../../constants';
import { actions } from '../../actions';
import { proxyToValue, proxyToName, selectCreateCalendarData, selectCreateCalendarUi, nameValueToProxy } from '../../globalFunctions';
import { Grid, PageHeader, Col, ControlLabel, FormGroup, Form, FormControl, OverlayTrigger, Radio, Tooltip, Collapse, Alert, Button } from 'react-bootstrap';
import LoadingButton from '../../components/LoadingButton/LoadingButton';

class ManageCalendar extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleQuillChange = this.handleQuillChange.bind(this);
    }
    handleChange(proxy) {
        const name = proxyToName(proxy);
        let value = proxyToValue(proxy);
        if (name === "visibility") {
            value = parseInt(value, 10);
        }
        this.props.setCreateCalendarInputField(name, value)
    }
    handleQuillChange(value) {
        this.handleChange(nameValueToProxy('calendar_description', value))
    }
    render() {
        return (
            <Grid>
                <PageHeader>
                    Kalender erstellen
                </PageHeader>
                <Form horizontal>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            <b>Titel</b>
                        </Col>
                        <Col sm={10}>
                            <FormControl
                                type="text"
                                placeholder="Titel"
                                value={this.props.calendar_title}
                                onChange={this.handleChange}
                                name="calendar_title"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            <b>Sichtbarkeit</b>
                        </Col>
                        <Col sm={10}>

                            <Radio
                                name="visibility"
                                inline
                                checked={this.props.visibility === 0}
                                onChange={this.handleChange}
                                value={0}
                            >
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip id="tooltip">
                                            Ihr Kalender wird nur für Sie zu verfügung stehen.
                                    </Tooltip>
                                    }
                                >
                                    <span>Privat</span>
                                </OverlayTrigger>

                            </Radio>


                            <Radio
                                name="visibility"
                                inline
                                checked={this.props.visibility === 1}
                                onChange={this.handleChange}
                                value={1}
                            >
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip id="tooltip">
                                            Andere können Ihren Kalender betrachten, allerdings nicht bearbeiten.
                                    </Tooltip>
                                    }
                                >
                                    <span>Sichtbar</span>
                                </OverlayTrigger>

                            </Radio>


                            <Radio
                                name="visibility"
                                inline
                                checked={this.props.visibility === 2}
                                onChange={this.handleChange}
                                value={2}
                            >
                                <OverlayTrigger
                                    placement="top"
                                    overlay={
                                        <Tooltip id="tooltip">
                                            Andere haben vollen Zugriff auf den Kalender, lediglich die Sichtbarkeitsfunktion ist Ihnen vorbehalten.
                                    </Tooltip>
                                    }
                                >
                                    <span>Öffentlich</span>
                                </OverlayTrigger>

                            </Radio>
                        </Col>
                    </FormGroup>

                    <FormGroup>
                        <Col componentClass={ControlLabel} sm={2}>
                            <b>Beschreibung</b>
                        </Col>
                        <Col sm={10}>
                            <ReactQuill
                                theme={'snow'}
                                onChange={this.handleQuillChange}
                                value={this.props.calendar_description}
                                modules={modules}
                                formats={formats}
                                placeholder={'Füge eine Beschreibung hinzu.'}
                            />
                        </Col>
                    </FormGroup>

                    <Collapse in={this.props.error}>
                        <Col smOffset={2} sm={10}>
                            <Alert bsStyle="danger">
                                <b>Whoops! </b>
                                <p>
                                    Da ist etwas schief gelaufen.
                                </p>
                            </Alert>
                        </Col>
                    </Collapse>

                    <Collapse in={this.props.success}>
                        <Col smOffset={2} sm={10}>
                            <Alert bsStyle="success">
                                Die Daten wurden erfolgreich gespeichert.
                                </Alert>
                        </Col>
                    </Collapse>
                    <Collapse in={this.props.showWarning}>
                        <Col smOffset={2} sm={10}>
                            <Alert bsStyle="info">
                                Bitte alle Pflichtfelder* ausfüllen
                            </Alert>
                        </Col>
                    </Collapse>
                    <LoadingButton loading={this.props.loading}>
                        <Col smOffset={2} sm={10}>
                            <Button
                                disabled={this.props.showWarning}
                                onClick={this.props.submitCreateCalendar}
                                bsStyle="success"
                            >
                                Speichern
                            </Button>
                        </Col>
                    </LoadingButton>
                </Form>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    const createCalendarUi = selectCreateCalendarUi(state);
    return {
        ...selectCreateCalendarData(state),
        ...createCalendarUi,
        showWarning: createCalendarUi.calendar_title === ""
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setCreateCalendarInputField: (name, value) => { dispatch(actions.setCreateCalendarInputField(name, value)) },
        submitCreateCalendar: () => { dispatch(actions.submitCreateCalendar()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCalendar)