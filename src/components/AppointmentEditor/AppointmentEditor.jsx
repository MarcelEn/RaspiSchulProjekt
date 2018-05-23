import React from 'react';
import style from './style_module.css';
import { Form, Col, FormControl, Button } from 'react-bootstrap';
import HorizontalFormElement from '../HorizontalFormElement/HorizontalFormElement';
import ReactQuill from 'react-quill';
import { formats, modules } from '../../constants';


const AppointmentEditor = props => (
    <Form horizontal>
        <HorizontalFormElement label="Kalender">
            <FormControl componentClass="select" multiple placeholder="Kalender">
                <option value="select"></option>
                <option value="other">...</option>
                <option value="select"></option>
                <option value="other">...</option>
                <option value="select"></option>
                <option value="other">...</option>
                <option value="select"></option>
                <option value="other">...</option>
            </FormControl>
        </HorizontalFormElement>
        <HorizontalFormElement label="Start">
            <Col xs={6}>
                <FormControl
                    type="date"
                    placeholder="Titel"
                    name=""
                />
            </Col>
            <Col xs={6}>
                <FormControl
                    type="time"
                    placeholder="Titel"
                    name=""
                />
            </Col>
        </HorizontalFormElement>
        <HorizontalFormElement label="Ende">
            <Col xs={6}>
                <FormControl
                    type="date"
                    placeholder="Titel"
                    name=""
                />
            </Col>
            <Col xs={6}>
                <FormControl
                    type="time"
                    placeholder="Titel"
                    name=""
                />
            </Col>
        </HorizontalFormElement>
        <HorizontalFormElement label="Titel">
            <FormControl
                type="text"
                placeholder="Titel"
                name=""
            />
        </HorizontalFormElement>

        <HorizontalFormElement label="Beschreibung">
            <ReactQuill
                theme={'snow'}
                value={""}
                modules={modules}
                formats={formats}
                placeholder={'Füge eine Beschreibung hinzu.'}
            />
        </HorizontalFormElement>
        <HorizontalFormElement>
            <Button bsStyle="success">
                Speichern
            </Button>
        </HorizontalFormElement>
    </Form>
)

export default AppointmentEditor;