import React from 'react';

import { FormControl, FormGroup, Button, Collapse, Alert, HelpBlock } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Centering from '../Centering/Centering';
import Card from '../Card/Card';

import style from './style.css';

const Registratino = props => (
    <Centering x className={style.width}>
        <Card>
            <FormGroup>
                <h3><b>Registrieren</b></h3>
            </FormGroup>
            <FormGroup validationState={props.userNameInUse ? 'error' : null}>
                <FormControl
                    type="text"
                    value={props.username}
                    placeholder="Nutzername*"
                    name="username"
                    onChange={props.handleUserinput}
                />

            </FormGroup>
            <Collapse in={props.userNameInUse}>
                <FormGroup>
                    <Alert bsStyle="danger">
                        Der Nutzername wird bereits verwendet.
                </Alert>
                </FormGroup>
            </Collapse>

            <FormGroup>
                <FormControl
                    type="text"
                    value={props.firstname}
                    placeholder="Vorname*"
                    name="firstname"
                    onChange={props.handleUserinput}
                />
            </FormGroup>
            <FormGroup>
                <FormControl
                    type="text"
                    value={props.lastname}
                    placeholder="Nachname*"
                    name="lastname"
                    onChange={props.handleUserinput}
                />
            </FormGroup>
            <FormGroup>
                <FormControl
                    type="mail"
                    value={props.email}
                    placeholder="E-Mail*"
                    name="email"
                    onChange={props.handleUserinput}
                />
            </FormGroup>
            <FormGroup>
                <FormControl
                    type="password"
                    value={props.password}
                    placeholder="Passwort*"
                    name="password"
                    onChange={props.handleUserinput}
                />
            </FormGroup>
            <FormGroup>
                <FormControl
                    type="password"
                    value={props.repeatPassword}
                    placeholder="Passwort wiederholen*"
                    name="repeatPassword"
                    onChange={props.handleUserinput}
                />
            </FormGroup>
            <FormGroup>
                <HelpBlock>* - Pflichtfelder</HelpBlock>
            </FormGroup>
            <FormGroup>
                <Button 
                className={style.large} 
                bsStyle="success"
                disabled={props.disableSubmitButton}
                >
                    Registrieren
                </Button>
            </FormGroup>
            <FormGroup>
                <Link to='/login'>
                    zurück zum Login
                </Link>
            </FormGroup>
        </Card>
    </Centering>
)

export default Registratino;