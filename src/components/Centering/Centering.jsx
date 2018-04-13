import React from 'react';
import style from './style.css';


const getClassNames = props => {
    if (!props.x && !props.y) {
        return style.x + ' ' + style.y;
    }
    let className = '';
    if (props.x) {
        className += style.x;
    }
    if (props.x && props.y) {
        className += ' ';
    }
    if (props.y) {
        className += style.y;
    }
    if(props.className){
        className+= ' ' + props.className;
    }
    return className;
}

const Centering = props => (
    <div className={getClassNames(props)}>
        {props.children}
    </div>
)

export default Centering;