import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './style_module.css';

import { actions } from '../../actions';
import { Grid, PageHeader, Form, Col, FormControl, FormGroup, ControlLabel, Collapse, Alert, Button } from 'react-bootstrap';
import LoadingButton from '../../components/LoadingButton/LoadingButton';
import { getUserImageUrlByUsername } from '../../globalFunctions';
class Login extends Component {
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
                    <FormGroup>
                        <Col componentClass={ControlLabel} smOffset={2} sm={2}>
                            <b>Nutzername</b>
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                type="text"
                                placeholder="Nutzername"
                                // value={props.calendarData.calendar_title}
                                // onChange={props.handleEditInput}
                                name="username"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} smOffset={2} sm={2}>
                            <b>Vorname</b>
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                type="text"
                                placeholder="Vorname"
                                // value={props.calendarData.calendar_title}
                                // onChange={props.handleEditInput}
                                name="firstname"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} smOffset={2} sm={2}>
                            <b>Nachname</b>
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                type="text"
                                placeholder="Nachname"
                                // value={props.calendarData.calendar_title}
                                // onChange={props.handleEditInput}
                                name="lastname"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col componentClass={ControlLabel} smOffset={2} sm={2}>
                            <b>E-Mail</b>
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                type="mail"
                                placeholder="E-Mail"
                                // value={props.calendarData.calendar_title}
                                // onChange={props.handleEditInput}
                                name="email"
                            />
                        </Col>
                    </FormGroup>
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
                    <FormGroup>
                        <Col componentClass={ControlLabel} smOffset={2} sm={2}>
                            <b>Passwort ändern</b>
                        </Col>
                        <Col sm={5}>
                            <FormControl
                                type="password"
                                placeholder="altes Passwort"
                                // value={props.calendarData.calendar_title}
                                // onChange={props.handleEditInput}
                                name="old_password"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={5} smOffset={4}>
                            <FormControl
                                type="password"
                                placeholder="neues Passwort"
                                // value={props.calendarData.calendar_title}
                                // onChange={props.handleEditInput}
                                name="new_password"
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={5} smOffset={4}>
                            <FormControl
                                type="password"
                                placeholder="neues Passwort wiederholen"
                                // value={props.calendarData.calendar_title}
                                // onChange={props.handleEditInput}
                                name="new_password_repeat"
                            />
                        </Col>
                    </FormGroup>
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
                    <FormGroup>
                        <Col componentClass={ControlLabel} smOffset={2} sm={2}>
                            <b>Profilbild</b>
                        </Col>
                        <Col sm={5} >
                            <img
                                alt="profileimage"
                                src={getUserImageUrlByUsername('liposselt')}
                                className={style.profileImage}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup>
                        <Col sm={5} smOffset={4}>
                            <FormControl
                                type="file"
                                // value={props.calendarData.calendar_title}
                                // onChange={props.handleEditInput}
                                name="profileImage"
                            />
                        </Col>
                    </FormGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login)