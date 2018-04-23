import React from 'react';
import style from './style.css';


const getClassnames = props => {
    if(props.className){
        return style.centering + ' ' + props.className;
    }else{
        return style.centering;
    }
}

const Centering = props => (
    <div className={getClassnames(props)}>
        {props.children}
    </div>
)

export default Centering;