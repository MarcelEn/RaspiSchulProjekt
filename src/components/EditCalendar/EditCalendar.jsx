import React from 'react';

import { Form, FormGroup, Col, FormControl, Radio, OverlayTrigger, Tooltip, ControlLabel } from 'react-bootstrap';
import ReactQuill from 'react-quill';


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
                <FormControl type="text" placeholder="Titel" />
            </Col>
        </FormGroup>



        <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
                <b>Sichtbarkeit</b>
            </Col>
            <Col sm={10}>

                <Radio name="visibility" inline>
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


                <Radio name="visibility" inline>
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


                <Radio name="visibility" inline>
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


        <FormGroup>
            <Col componentClass={ControlLabel} sm={2}>
                <b>Beschreibung</b>
            </Col>
            <Col sm={10}>
                <ReactQuill
                    theme={'snow'}
                    //onChange={this.handleChange}
                    //value={this.state.editorHtml}
                    modules={modules}
                    formats={formats}
                    placeholder={'Füge eine Beschreibung hinzu.'}
                />
            </Col>
        </FormGroup>


    </Form>
)

export default EditCalendar;