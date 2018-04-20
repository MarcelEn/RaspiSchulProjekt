import React from 'react';
import style from './style.css';


const PopupWrapper = props => (
    <div className={style.PopupWrapper}>
        {props.children}
    </div>
)

export default PopupWrapper;