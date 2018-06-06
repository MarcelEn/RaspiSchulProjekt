import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './style_module.css';

import { actions } from '../../actions';
import { Grid, PageHeader, Form, Col, FormControl, FormGroup, ControlLabel, Collapse, Alert, Button } from 'react-bootstrap';
import LoadingButton from '../../components/LoadingButton/LoadingButton';
import { getUserImageUrlByUsername, proxyToName, proxyToValue, selectUserSettingsData, selectUserSettingsUi } from '../../globalFunctions';
import HorizontalFormElement from '../../components/HorizontalFormElement/HorizontalFormElement';
class UserSettings extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(proxy) {
        this.props.setUserSettingsInputField(proxyToName(proxy), proxyToValue(proxy))
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
                            value={this.props.userName}
                            onChange={this.handleChange}
                            name="userName"
                        />
                    </HorizontalFormElement>
                    <HorizontalFormElement label="Vorname">
                        <FormControl
                            type="text"
                            placeholder="Vorname"
                            value={this.props.first_name}
                            onChange={this.handleChange}
                            name="firstName"
                        />
                    </HorizontalFormElement>
                    <HorizontalFormElement label="Nachname">
                        <FormControl
                            type="text"
                            placeholder="Nachname"
                            value={this.props.last_name}
                            onChange={this.handleChange}
                            name="lastName"
                        />
                    </HorizontalFormElement>
                    <HorizontalFormElement label="E-Mail">
                        <FormControl
                            type="text"
                            placeholder="E-Mail"
                            value={this.props.mail}
                            onChange={this.handleChange}
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
                                asdfasfd
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
                            value={this.props.user_name}
                            onChange={this.handleChange}
                            name="oldPassword"
                        />
                    </HorizontalFormElement>

                    <HorizontalFormElement>
                        <FormControl
                            type="password"
                            placeholder="neues Passwort"
                            value={this.props.user_name}
                            onChange={this.handleChange}
                            name="newPassword"
                        />
                    </HorizontalFormElement>
                    <HorizontalFormElement>
                        <FormControl
                            type="password"
                            placeholder="neues Passwort wiederholen"
                            value={this.props.user_name}
                            onChange={this.handleChange}
                            name="newPasswordRepeat"
                        />
                    </HorizontalFormElement>
                    <Collapse in={this.props.newPassword !== this.props.newPasswordRepeat && this.props.newPassword !== ""}>
                        <Col sm={5} smOffset={4}>
                            <Alert bsStyle="danger">
                                <p>
                                    Die Passwörter stimmen nicht überein
                                </p>
                            </Alert>
                        </Col>
                    </Collapse>
                    <Collapse in={this.props.passwordSuccess}>
                        <Col sm={5} smOffset={4}>
                            <Alert bsStyle="success">
                                <b>Erfolg! </b>
                                <p>
                                    Das Passwort wurde erfolgreich geändert.
                                </p>
                            </Alert>
                        </Col>
                    </Collapse>
                    <Collapse in={this.props.passwordError}>
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
                        <LoadingButton loading={this.props.passwordLoading}>
                            <Button
                                className={style.large}
                                bsStyle="success"
                                disabled={this.props.disableSubmitPassword}
                                onClick={this.props.handlePasswordSubmit}
                            >
                                neues Passwort speichern
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
                            value={this.props.user_name}
                            onChange={this.handleChange}
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
    const userSettingsUi = selectUserSettingsUi(state);
    const disableSubmitPassword = userSettingsUi.newPassword !== userSettingsUi.newPasswordRepeat ||
        userSettingsUi.oldPassword === "" ||
        userSettingsUi.newPassword === ""
    return {
        ...selectUserSettingsData(state),
        ...userSettingsUi,
        disableSubmitPassword
    }

}

function mapDispatchToProps(dispatch) {
    return {
        setUserSettingsInputField: (name, value) => { dispatch(actions.setUserSettingsInputField(name, value)) },
        handlePasswordSubmit: () => {dispatch(actions.submitUserSettingsPasswordChange())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings)