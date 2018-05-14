import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormControl, FormGroup, Button, Collapse, Alert, HelpBlock } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import style from './style_module.css';

import { actions } from '../../actions';
import { proxyToValue, proxyToName } from '../../globalFunctions';
import Centering from '../../components/Centering/Centering';
import Card from '../../components/Card/Card';
import LoadingButton from '../../components/LoadingButton/LoadingButton';

//TODO: Connect Registration to middleware and implement error features in the dumb Component
class Registration extends Component {
    constructor(props) {
        super(props);
        this.handleUserinput = this.handleUserinput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePasswordRepeateLeave = this.handlePasswordRepeateLeave.bind(this);
        this.shouldDisableSubmitButton = this.shouldDisableSubmitButton.bind(this);
        this.lookupUsername = this.lookupUsername.bind(this);
    }

    handleUserinput(proxy) {
        const name = proxyToName(proxy);
        if (name === 'username') {
            this.props.setRegistrationUsernameInUse(false);
        }
        if (name === 'password' || name === 'repeatPassword') {
            this.props.setRegistrationInputField(name, proxyToValue(proxy));
            this.props.setRegistrationInputField('displayPasswordError', false);
        } else {
            this.props.setRegistrationInputField(name, proxyToValue(proxy));
        }
    }

    handleSubmit() {
        this.props.sendRegistrationData(this.props.ui);
    }

    shouldDisableSubmitButton() {
        const oneIsMissing = Object.keys(this.props.ui).find(key => this.props.ui[key] === '');
        if (oneIsMissing || this.props.ui.password !== this.props.ui.repeatPassword || this.props.data.usernameInUse) {
            return true;
        }
        return false;
    }

    handlePasswordRepeateLeave() {
        if (this.props.ui.password !== this.props.ui.repeatPassword && this.props.ui.repeatPassword !== '') {
            this.props.setRegistrationInputField('displayPasswordError', true);
        } else {
            this.props.setRegistrationInputField('displayPasswordError', false);
        }
    }

    lookupUsername(proxy) {
        const username = proxyToValue(proxy);
        if (username !== '') {
            this.props.lookupRegistrationUsername(username);
        }
    }

    render() {
        return (
            <Centering x className={style.width}>
                <Card>
                    <FormGroup>
                        <h3><b>Registrieren</b></h3>
                    </FormGroup>
                    <FormGroup validationState={this.props.data.userNameInUse ? 'error' : null}>
                        <FormControl
                            type="text"
                            value={this.props.ui.username}
                            placeholder="Nutzername*"
                            name="username"
                            onChange={this.handleUserinput}
                            onBlur={this.lookupUsername}
                        />

                    </FormGroup>
                    <Collapse in={this.props.data.usernameInUse}>
                        <FormGroup>
                            <Alert bsStyle="danger">
                                Der Nutzername wird bereits verwendet.
                            </Alert>
                        </FormGroup>
                    </Collapse>

                    <FormGroup>
                        <FormControl
                            type="text"
                            value={this.props.ui.firstname}
                            placeholder="Vorname*"
                            name="firstname"
                            onChange={this.handleUserinput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type="text"
                            value={this.props.ui.lastname}
                            placeholder="Nachname*"
                            name="lastname"
                            onChange={this.handleUserinput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormControl
                            type="mail"
                            value={this.props.ui.email}
                            placeholder="E-Mail*"
                            name="email"
                            onChange={this.handleUserinput}
                        />
                    </FormGroup>
                    <FormGroup validationState={this.props.ui.displayPasswordError ? 'error' : null}>
                        <FormControl
                            type="password"
                            value={this.props.ui.password}
                            placeholder="Passwort*"
                            name="password"
                            onChange={this.handleUserinput}
                            onBlur={this.handlePasswordRepeateLeave}
                        />
                    </FormGroup>
                    <FormGroup validationState={this.props.ui.displayPasswordError ? 'error' : null}>
                        <FormControl
                            type="password"
                            value={this.props.ui.repeatPassword}
                            placeholder="Passwort wiederholen*"
                            name="repeatPassword"
                            onChange={this.handleUserinput}
                            onBlur={this.handlePasswordRepeateLeave}
                        />
                    </FormGroup>
                    <Collapse in={this.props.ui.displayPasswordError}>
                        <FormGroup>
                            <Alert bsStyle="danger">
                                Die eingegebenen Passwörter sind nicht identisch.
                    </Alert>
                        </FormGroup>
                    </Collapse>
                    <FormGroup>
                        <HelpBlock>* - Pflichtfelder</HelpBlock>
                    </FormGroup>
                    <FormGroup>
                        <LoadingButton loading={this.props.data.loading}>
                            <div>
                                <Button
                                    className={style.large}
                                    bsStyle="success"
                                    disabled={this.shouldDisableSubmitButton()}
                                    onClick={this.handleSubmit}
                                >
                                    Registrieren
                                </Button>
                            </div>
                        </LoadingButton>

                    </FormGroup>
                    <FormGroup>
                        <Link to='/login'>
                            zurück zum Login
                        </Link>
                    </FormGroup>
                </Card>
            </Centering>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.data.registrationData,
        ui: state.ui.registrationUi
    };
}

function mapDispatchToProps(dispatch) {
    return {
        sendRegistrationData: registrationData => { dispatch(actions.sendRegistrationData(registrationData)) },
        lookupRegistrationUsername: username => { dispatch(actions.lookupRegistrationUsername(username)) },
        setRegistrationInputField: (name, value) => { dispatch(actions.setRegistrationInputField(name, value)) },
        setRegistrationUsernameInUse: status => { dispatch(actions.setRegistrationUsernameInUse(status)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Registration)