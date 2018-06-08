import React, { Component } from 'react';
import { connect } from 'react-redux';

import style from './style_module.css';

import { actions } from '../../actions';
import { Grid, PageHeader, Form, Col, FormControl, FormGroup, ControlLabel, Collapse, Alert, Button } from 'react-bootstrap';
import LoadingButton from '../../components/LoadingButton/LoadingButton';
import { getUserImageUrlByUsername } from '../../apiConnector';
import { proxyToName, proxyToValue, selectUserSettingsData, selectUserSettingsUi } from '../../globalFunctions';
import HorizontalFormElement from '../../components/HorizontalFormElement/HorizontalFormElement';
class UserSettings extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(proxy) {
        this.props.setUserSettingsInputField(proxyToName(proxy), proxyToValue(proxy))
    }
    componentWillMount() {
        this.props.initUserSettings()
    }
    render() {
        if (!this.props.userDataIsAvailable) {
            return (
                <Grid>
                    <PageHeader>
                        Einstellungen
                </PageHeader>
                    <Col sm={5} smOffset={4}>
                        <LoadingButton loading />
                    </Col>
                </Grid>
            )
        }
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
                            value={this.props.firstName}
                            onChange={this.handleChange}
                            name="firstName"
                        />
                    </HorizontalFormElement>
                    <HorizontalFormElement label="Nachname">
                        <FormControl
                            type="text"
                            placeholder="Nachname"
                            value={this.props.lastName}
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
                    <Collapse in={this.props.userDataSuccess}>
                        <Col sm={5} smOffset={4}>
                            <Alert bsStyle="success">
                                <b>Erfolg! </b>
                                <p>
                                    Ihre Daten wurden erfolgreich gesendet
                                    </p>
                            </Alert>
                        </Col>
                    </Collapse>
                    <Collapse in={this.props.userDataError}>
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
                        <LoadingButton loading={this.props.userDataLoading}>
                            <Button
                                onClick={this.props.handleUserDataSubmit}
                                className={style.large}
                                bsStyle="success"
                                disabled={this.props.disableSubmitUserData}
                            >
                                Nutzerdaten senden
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
                            value={this.props.oldPassword}
                            onChange={this.handleChange}
                            name="oldPassword"
                        />
                    </HorizontalFormElement>

                    <HorizontalFormElement>
                        <FormControl
                            type="password"
                            placeholder="neues Passwort"
                            value={this.props.newPassword}
                            onChange={this.handleChange}
                            name="newPassword"
                        />
                    </HorizontalFormElement>
                    <HorizontalFormElement>
                        <FormControl
                            type="password"
                            placeholder="neues Passwort wiederholen"
                            value={this.props.newPasswordRepeat}
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
                            id="profileImage"
                            type="file"
                            onChange={this.handleChange}
                            name="profileImage"
                        />
                    </HorizontalFormElement>

                    <Collapse in={this.props.profileImageSuccess}>
                        <Col sm={5} smOffset={4}>
                            <Alert bsStyle="success">
                                <b>Erfolg! </b>
                                <p>
                                    Das Bild wurde erfolgreich hochgeladen.
                                </p>
                            </Alert>
                        </Col>
                    </Collapse>
                    <Collapse in={this.props.profileImageError}>
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
                        <LoadingButton loading={this.props.profileImageLoading}>
                            <Button
                                onClick={this.props.uploadUserSettingsProfileImage}
                                disabled={!this.props.profileImage}
                                className={style.large}
                                bsStyle="success">
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
    let userSettingsUi = selectUserSettingsUi(state);
    const disableSubmitPassword = userSettingsUi.newPassword !== userSettingsUi.newPasswordRepeat ||
        userSettingsUi.oldPassword === "" ||
        userSettingsUi.newPassword === ""

    const disableSubmitUserData = userSettingsUi.userName === "" ||
        userSettingsUi.firstName === "" ||
        userSettingsUi.lastName === "" ||
        userSettingsUi.mail === ""

    return {
        ...selectUserSettingsData(state),
        ...userSettingsUi,
        disableSubmitUserData,
        disableSubmitPassword
    }

}

function mapDispatchToProps(dispatch) {
    return {
        setUserSettingsInputField: (name, value) => { dispatch(actions.setUserSettingsInputField(name, value)) },
        handlePasswordSubmit: () => { dispatch(actions.submitUserSettingsPasswordChange()) },
        handleUserDataSubmit: () => { dispatch(actions.submitUserSettingsUserData()) },
        initUserSettings: () => { dispatch(actions.initUserSettings()) },
        uploadUserSettingsProfileImage: () => { dispatch(actions.uploadUserSettingsProfileImage()) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserSettings)