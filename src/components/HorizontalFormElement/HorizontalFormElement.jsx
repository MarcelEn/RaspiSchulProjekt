import React from 'react';
import { FormGroup, ControlLabel, Col } from 'react-bootstrap';

const HorizontalFormElement = props => (
    <FormGroup>
        {
            props.label ?
                <Col componentClass={ControlLabel} smOffset={2} sm={2}>
                    <b>{props.label}</b>
                </Col>
                :
                ''
        }
        <Col sm={5} smOffset={props.label ? 0 : 4}>
            {props.children}
        </Col>
    </FormGroup>
)

export default HorizontalFormElement;