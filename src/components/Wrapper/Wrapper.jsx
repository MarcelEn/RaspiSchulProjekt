import React from 'react';
import style from './style_module.css';


const Wrapper = props => (
    <div className={style.wrapper}>
        {props.children}
    </div>
)

export default Wrapper;