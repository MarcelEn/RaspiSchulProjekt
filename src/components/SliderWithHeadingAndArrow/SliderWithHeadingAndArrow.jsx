import React from 'react';
import { Row, Col, Collapse } from 'react-bootstrap';

import style from './style_module.css';

import CollapseArrow from '../CollapseArrow/CollapseArrow';



const SliderWithHeadingAndArrow = props => (
    <div>
        <Row className={style.verticalAlign}>
            <Col
                xs={1}
            >
                <CollapseArrow
                    isOpen={props.isOpen}
                    onClick={props.handleDescriptionToggle}
                />
            </Col>
            {props.heading}
        </Row>
        <Collapse in={props.isOpen}>
            <div>
                <hr />
                {props.descirption}
            </div>
        </Collapse>
        <hr />
    </div>
)

export default SliderWithHeadingAndArrow;