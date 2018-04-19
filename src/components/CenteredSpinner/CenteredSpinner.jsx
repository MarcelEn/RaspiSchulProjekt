import React from 'react';
import style from './style.css';
import Centering from '../Centering/Centering';
import { PropagateLoader } from 'react-spinners';


const CenteredSpinner = props => (
    <Centering x className={style.centeredSpinner}>
        <PropagateLoader />
    </Centering>
)

export default CenteredSpinner;