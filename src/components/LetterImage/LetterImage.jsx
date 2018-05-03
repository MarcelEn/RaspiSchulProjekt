import React from 'react';
import style from './style_module.css';
import { getColorOfLetter } from '../../globalFunctions';

const LetterImage = props => (
    <div
        className={style.roundedImage}
        style={{ backgroundColor: getColorOfLetter(props.firstname, props.lastname) }}
    >
        <b>{props.firstname[0].toUpperCase()}</b>
    </div>
)

export default LetterImage;