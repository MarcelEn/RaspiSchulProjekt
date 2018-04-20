import React from 'react';

import { FormControl, FormGroup, Button, Alert, Collapse, Checkbox } from 'react-bootstrap';
import { Link } from 'react-router-dom';


import Centering from '../Centering/Centering';
import Card from '../Card/Card';

import style from './style.css';
import LoadingButton from '../LoadingButton/LoadingButton';

const Login = props => (
    <Centering x className={style.width}>
        <Card>
            <FormGroup>
                <h3><b>Login</b></h3>
            </FormGroup>
            <FormGroup validationState={props.error ? 'error' : null}>
                <FormControl
                    type="text"
                    value={props.username}
                    name="username"
                    placeholder="Nutzername"
                    onChange={props.handleUserinput}
                    disabled={props.loading}
                />

            </FormGroup>
            <FormGroup validationState={props.error ? 'error' : null}>
                <FormControl
                    type="password"
                    value={props.password}
                    name="password"
                    placeholder="Passwort"
                    onChange={props.handleUserinput}
                    disabled={props.loading}
                />
            </FormGroup>
            <FormGroup>
                <Checkbox checked={props.stayLoggedIn} onClick={props.handleStayLoggedInCheckbox}>
                    eingeloggt bleiben
                </Checkbox>
            </FormGroup>
            <Collapse in={props.error}>
                <FormGroup>
                    <Alert bsStyle="danger">
                        Passwort oder Nutzername falsch.
                    </Alert>
                </FormGroup>
            </Collapse>
            <FormGroup>
                <LoadingButton loading={props.loading}>
                    <div>
                        <Button
                            className={style.large}
                            bsStyle="success"
                            onClick={props.handleSubmit}
                            disabled={props.username === '' || props.password === ''}
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
)

export default Login;