import React from 'react';
import style from './style_module.css';


const LetterImage = props => (
    <div className={style.roundedImage}>

        <b>{props.firstname[0].toUpperCase() + props.lastname[0].toUpperCase()}</b>
    </div>
)

export default LetterImage;