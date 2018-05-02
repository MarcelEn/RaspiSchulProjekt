import React from 'react';
import style from './style_module.css';
import { PropagateLoader } from 'react-spinners';

const LoadingButton = props => (
    props.loading ?
        <div className={style.loadingSpinner + ' ' + style.spacer}>
            <PropagateLoader />
        </div>
        :
        props.children
)

export default LoadingButton;