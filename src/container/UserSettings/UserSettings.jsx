import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './style_module.css';

import { actions } from '../../actions';
import { Grid, PageHeader, Form, Col, FormControl, FormGroup, ControlLabel, Collapse, Alert, Button } from 'react-bootstrap';
import LoadingButton from '../../components/LoadingButton/LoadingButton';
import { getUserImageUrlByUsername } from '../../globalFunctions';
import HorizontalFormElement from '../../components/HorizontalFormElement/HorizontalFormElement';
class UserSettings extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Grid>
                <PageHeader>
                    Einstellungen
                </PageHeader>
                <Form horizontal>

                    <HorizontalFormElement label="Nutzername">
                        <FormControl
                            type="text"
                            placeholder="Nutzername"
                            // value={props.calendarData.calendar_title}
                            // onChange={props.handleEditInput}
                            name="username"
                        />
                    </HorizontalFormElement>
                    <HorizontalFormElement label="Vorname">
                        <FormControl
                            type="text"
                            placeholder="Vorname"
                            // value={props.calendarData.calendar_title}
                            // onChange={props.handleEditInput}
                            name="firstname"
                        />
                    </HorizontalFormElement>
                    <HorizontalFormElement label="Nachname">
                        <FormControl
                            type="text"
                            placeholder="Nachname"
                            // value={props.calendarData.calendar_title}
                            // onChange={props.handleEditInput}
                            name="lastname"
                        />
                    </HorizontalFormElement>
                    <HorizontalFormElement label="E-Mail">
                        <FormControl
                            type="text"
                            placeholder="E-Mail"
                            // value={props.calendarData.calendar_title}
                            // onChange={props.handleEditInput}
                            name="mail"
                        />
                    </HorizontalFormElement>

                    <Collapse in>
                        <Col sm={5} smOffset={4}>
                            <Alert bsStyle="success">
                                <b>Erfolg! </b>
                                <p>
                                    Ihre Daten wurden erfolgreich gesendet
                                    </p>
                            </Alert>
                        </Col>
                    </Collapse>
                    <Collapse in>
                        <Col sm={5} smOffset={4}>
                            <Alert bsStyle="danger">
                                <b>Fehler! </b>
                                <p>
                                    Bitte überprüfen Sie nochmal Ihre Eingaben.
                                </p>
                            </Alert>
                        </Col>
                    </Collapse>
                    <Col sm={5} smOffset={4}>
                        <LoadingButton>
                            <Button className={style.large} bsStyle="success">
                                neues Passwort senden
                            </Button>
                        </LoadingButton>
                    </Col>




                    <Col sm={5} smOffset={4}>
                        <hr />
                    </Col>




                    <HorizontalFormElement label="Passwort ändern">
                        <FormControl
                            type="password"
                            placeholder="altes Passwort"
                            // value={props.calendarData.calendar_title}
                            // onChange={props.handleEditInput}
                            name="old_password"
                        />
                    </HorizontalFormElement>

                    <HorizontalFormElement>
                        <FormControl
                            type="password"
                            placeholder="neues Passwort"
                            // value={props.calendarData.calendar_title}
                            // onChange={props.handleEditInput}
                            name="new_password"
                        />
                    </HorizontalFormElement>
                    <HorizontalFormElement>
                        <FormControl
                            type="password"
                            placeholder="neues Passwort wiederholen"
                            // value={props.calendarData.calendar_title}
                            // onChange={props.handleEditInput}
                            name="new_password_repeat"
                        />
                    </HorizontalFormElement>
                    <Collapse in>
                        <Col sm={5} smOffset={4}>
                            <Alert bsStyle="success">
                                <b>Erfolg! </b>
                                <p>
                                    Das Passwort wurde erfolgreich geändert.
                                    </p>
                            </Alert>
                        </Col>
                    </Collapse>
                    <Collapse in>
                        <Col sm={5} smOffset={4}>
                            <Alert bsStyle="danger">
                                <b>Fehler! </b>
                                <p>
                                    Bitte überprüfen Sie nochmal Ihre Eingaben.
                                    </p>
                            </Alert>
                        </Col>
                    </Collapse>
                    <Col sm={5} smOffset={4}>
                        <LoadingButton>
                            <Button className={style.large} bsStyle="success">
                                neues Passwort senden
                            </Button>
                        </LoadingButton>
                    </Col>





                    <Col sm={5} smOffset={4}>
                        <hr />
                    </Col>





                    <HorizontalFormElement label="Profilbild">
                        <img
                            alt="profileimage"
                            src={getUserImageUrlByUsername('liposselt')}
                            className={style.profileImage}
                        />
                    </HorizontalFormElement>
                    <HorizontalFormElement>
                        <FormControl
                            type="file"
                            // value={props.calendarData.calendar_title}
                            // onChange={props.handleEditInput}
                            name="profileImage"
                        />
                    </HorizontalFormElement>
                    
                    <Collapse in>
                        <Col sm={5} smOffset={4}>
                            <Alert bsStyle="success">
                                <b>Erfolg! </b>
                                <p>
                                    Das Bild wurde erfolgreich hochgeladen.
                                </p>
                            </Alert>
                        </Col>
                    </Collapse>
                    <Collapse in>
                        <Col sm={5} smOffset={4}>
                            <Alert bsStyle="danger">
                                <b>Fehler! </b>
                                <p>
                                    Beim Upload ist etwas schief gelaufen.
                                </p>
                            </Alert>
                        </Col>
                    </Collapse>
                    <Col sm={5} smOffset={4}>
                        <LoadingButton>
                            <Button className={style.large} bsStyle="success">
                                Bild hochladen
                            </Button>
                        </LoadingButton>
                    </Col>

                </Form>

            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
    }

}

function mapDispatchToProps(dispatch) {
    return {
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings)