import React from 'react';
import style from './style.css';
import { PropagateLoader } from 'react-spinners';

const LoadingButton = props => (
    props.loading ?
        <div className={style.loadingSpinner + ' ' + style.spacer}>
            <PropagateLoader />
        </div>
        :
        <div className={style.spacer}>
            {props.children}
        </div>
)

export default LoadingButton;