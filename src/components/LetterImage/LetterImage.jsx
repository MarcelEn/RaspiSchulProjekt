import React from 'react';
import style from './style_module.css';


const LetterImage = props => (
    <div className={style.roundedImage}>
        <b>{props.letter[0].toUpperCase()}</b>
    </div>
)

export default LetterImage;