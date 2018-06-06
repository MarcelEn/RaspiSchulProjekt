import React from 'react';
import { Col, Collapse } from 'react-bootstrap';

import CollapseArrow from '../CollapseArrow/CollapseArrow';
import ListCard from '../ListCard/ListCard';



const SliderWithHeadingAndArrow = props => (
    <div>
        <ListCard>
            <Col
                xs={1}
            >
                <CollapseArrow
                    isOpen={props.isOpen}
                    onClick={props.handleDescriptionToggle}
                />
            </Col>
            {props.heading}
        </ListCard>
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