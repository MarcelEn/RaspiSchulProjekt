import React from 'react';
import style from './style_module.css';
import arrow from './Arrow.svg';

const CollapseArrow = props => (
    <img
        src={arrow}
        alt="Collapse Arrow"
        className={props.isOpen ? style.arrow : style.closed + ' ' + style.arrow}
        onClick={props.onClick}
    />
)

export default CollapseArrow;