import React from 'react';
import style from './style_module.css';
import { FormControl, FormGroup, Button, Collapse, Alert } from 'react-bootstrap';
import LoadingButton from '../LoadingButton/LoadingButton';
import CalendarDetails from './CalendarDetails';

const AddCalendar = props => (
    <div>
        <FormGroup>
            <h3><b>Kalender hinzufügen</b></h3>
        </FormGroup>
        <FormGroup>
            <FormControl
                type="text"
                value={props.v}
                name="titleOrId"
                placeholder="Kalender - Titel / ID"
                onChange={props.handleUserinput}
                disabled={props.loading}
            />

        </FormGroup>
        <FormGroup>
            <FormControl
                type="text"
                value={props.username}
                name="username"
                placeholder="Nutzername"
                onChange={props.handleUserinput}
                disabled={props.loading}
            />
        </FormGroup>
        <Collapse in={props.error}>
            <Alert bsStyle="danger">
                <b>Whoops!</b>
                <p>
                    Da ist was schief gelaufen :/
                </p>
            </Alert>
        </Collapse>
        <Collapse in={props.titleOrId.length < 4 && props.username.length < 4 && !props.error}>
            <FormGroup>
                <Alert bsStyle="warning">
                    Sie müssen mindestens 4 Zeichen eingeben.
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
                        disabled={props.titleOrId.length < 4 && props.username.length < 4}
                    >
                        Suchen
                    </Button>
                </div>
            </LoadingButton>
        </FormGroup>
        <Collapse in={props.searchResults.length > 0}>
            <div>
                {
                    props.searchResults.map((data, index) => (
                        <CalendarDetails
                            calendarData={data}
                            userData={props.userData.find(userData => userData.user_id === data.owner_id)}
                            index={index}
                            isOpen={index === props.openedDescription}
                            handleDescriptionToggle={props.handleDescriptionToggle}
                            key={'addCalendar-' + index}
                        />
                    ))
                }
            </div>
        </Collapse>
    </div>
)


export default AddCalendar;