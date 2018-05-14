import React from 'react';
import style from './style_module.css';
import {Row} from 'react-bootstrap';

const ListCard = props => (
    <Row className={style.verticalAlign}>
        {props.children}
    </Row>
)

export default ListCard;