import React from 'react';
import style from './style.css';


const PopupContent = props => (
    <div className={style.PopupContent}>
        {props.children}
    </div>
)

export default PopupContent;