import React from 'react';
import style from './style_module.css';


const Card = props => (
    <div className={style.card}>
        {props.children}
    </div>
)

export default Card;