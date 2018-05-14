import React, { Component } from 'react';
import { connect } from 'react-redux';

import { FormGroup, FormControl, Checkbox, Collapse, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import { actions } from '../../actions';
import { proxyToValue, proxyToName } from '../../globalFunctions';
import Centering from '../../components/Centering/Centering';
import style from './style_module.css';
import Card from '../../components/Card/Card';
import LoadingButton from '../../components/LoadingButton/LoadingButton';
class Login extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUserinput = this.handleUserinput.bind(this);
        this.handleStayLoggedInCheckbox = this.handleStayLoggedInCheckbox.bind(this);
    }

    handleSubmit() {
        this.props.sendLoginData(this.props.ui);
    }

    handleUserinput(proxy) {
        this.props.setLoginInputField(proxyToName(proxy), proxyToValue(proxy));
    }

    handleStayLoggedInCheckbox() {
        this.props.setLoginInputField('stayLoggedIn', !this.props.ui.stayLoggedIn);
    }
    render() {
        return (
            <Centering x y className={style.width}>
                <Card>
                    <FormGroup>
                        <h3><b>Login</b></h3>
                    </FormGroup>
                    <FormGroup validationState={this.props.data.error ? 'error' : null}>
                        <FormControl
                            type="text"
                            value={this.props.ui.username}
                            name="username"
                            placeholder="Nutzername"
                            onChange={this.handleUserinput}
                            disabled={this.props.data.loading}
                        />

                    </FormGroup>
                    <FormGroup validationState={this.props.data.error ? 'error' : null}>
                        <FormControl
                            type="password"
                            value={this.props.ui.password}
                            name="password"
                            placeholder="Passwort"
                            onChange={this.handleUserinput}
                            disabled={this.props.data.loading}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Checkbox checked={this.props.ui.stayLoggedIn} onClick={this.handleStayLoggedInCheckbox}>
                            eingeloggt bleiben
                        </Checkbox>
                    </FormGroup>
                    <Collapse in={this.props.data.error}>
                        <FormGroup>
                            <Alert bsStyle="danger">
                                Passwort oder Nutzername falsch.
                            </Alert>
                        </FormGroup>
                    </Collapse>
                    <FormGroup>
                        <LoadingButton loading={this.props.data.loading}>
                            <div>
                                <Button
                                    className={style.large}
                                    bsStyle="success"
                                    onClick={this.handleSubmit}
                                    disabled={this.props.ui.username === '' || this.props.ui.password === ''}
                                >
                                    Login
                            </Button>
                            </div>
                        </LoadingButton>
                    </FormGroup>
                    <FormGroup>
                        <Link to='/registration'>
                            Registrieren
                        </Link>
                    </FormGroup>
                </Card>
            </Centering >
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.data.loginData,
        ui: state.ui.loginUi
    }

}

function mapDispatchToProps(dispatch) {
    return {
        sendLoginData: loginData => { dispatch(actions.sendLoginData(loginData)) },
        setLoginInputField: (name, value) => { dispatch(actions.setLoginInputField(name, value)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)