import React from 'react';

import { Form, FormGroup, Col, FormControl, Radio, OverlayTrigger, Tooltip, ControlLabel, Button, ButtonGroup, Collapse, Alert } from 'react-bootstrap';
import ReactQuill from 'react-quill';
import { PropagateLoader } from 'react-spinners';

import style from './style_module.css';


const modules = {
    toolbar: [
        [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' },
        { 'indent': '-1' }, { 'indent': '+1' }],
        ['link'],
        ['clean']
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}

const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
]




const EditCalendar = props => (
    <Form horizontal>
        <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
                <b>Titel</b>
            </Col>
            <Col sm={10}>
                <FormControl
                    type="text"
                    placeholder="Titel"
                    value={props.calendarData.calendar_title}
                    onChange={props.handleEditInput}
                    name="calendar_title"
                />
            </Col>
        </FormGroup>


        {
            props.calendarData.owner_id === props.userId ?
                <FormGroup>
                    <Col componentClass={ControlLabel} sm={2}>
                        <b>Sichtbarkeit</b>
                    </Col>
                    <Col sm={10}>

                        <Radio
                            name="visibility"
                            inline
                            checked={props.calendarData.visibility === 0}
                            onChange={props.handleEditInput}
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
                            checked={props.calendarData.visibility === 1}
                            onChange={props.handleEditInput}
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
                            checked={props.calendarData.visibility === 2}
                            onChange={props.handleEditInput}
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
                :
                ''
        }

        <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
                <b>Beschreibung</b>
            </Col>
            <Col sm={10}>
                <ReactQuill
                    theme={'snow'}
                    onChange={props.handleEditInput}
                    value={props.calendarData.calendar_description}
                    modules={modules}
                    formats={formats}
                    placeholder={'Füge eine Beschreibung hinzu.'}
                />
            </Col>
        </FormGroup>

        <Collapse in={props.error}>
            <FormGroup>
                <Col smOffset={2} sm={10}>
                    <Alert bsStyle="danger">
                        <b>Whoops! </b>
                        <p>
                            Da ist etwas schief gelaufen.
                        </p>
                    </Alert>
                </Col>
            </FormGroup>
        </Collapse>

        <Collapse in={props.success}>
            <FormGroup>
                <Col smOffset={2} sm={10}>
                    <Alert bsStyle="success">
                        Die Daten wurden erfolgreich gespeichert.
                    </Alert>
                </Col>
            </FormGroup>
        </Collapse>
        <FormGroup>
            {
                props.loading ?
                    <Col smOffset={2} sm={10}>
                        <div className={style.moveSpinnerToCenter}>
                            <PropagateLoader />
                        </div>
                    </Col>
                    :
                    <Col smOffset={2} sm={10}>
                        <ButtonGroup>
                            <Button
                                bsStyle="default"
                                onClick={props.cancelManageCalendarEditing}
                            >
                                zurück
                            </Button>
                            <Button
                                bsStyle="primary"
                                disabled={props.calendarData.calendar_title === ''}
                                onClick={props.handleSave}
                            >
                                speichern
                            </Button>
                            <Button
                                bsStyle="danger"
                                onClick={() => props.setManageCalendarDeletionWarning(true)}
                            >
                                löschen
                            </Button>
                        </ButtonGroup>

                    </Col>
            }
        </FormGroup>
        <Collapse in={props.showDeleteWarning}>
            <FormGroup>
                <Col smOffset={2} sm={10}>
                    <Alert bsStyle="danger">
                        <b>Sind Sie sich sicher?</b>
                        <p>
                            <b>Hinweis:</b> Durch das Löschen werden ebenfalls alle Termine gelöscht.{' '}
                            <Button
                                bsStyle="danger"
                                onClick={() => props.deleteManageCalendarEditing(props.calendarData.calendar_id)}
                            >
                                löschen
                            </Button>
                            {' '}
                            <Button
                                bsStyle="success"
                                onClick={() => props.setManageCalendarDeletionWarning(false)}
                            >
                                abbrechen
                            </Button>
                        </p>
                    </Alert>
                </Col>
            </FormGroup>
        </Collapse>


    </Form>
)

export default EditCalendar;