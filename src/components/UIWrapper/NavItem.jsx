import React from 'react';
import { Link } from 'react-router-dom';
import style from './style.css';

const isString = value => typeof value === 'string';

const UIWrapper = props => (
    <ul className="nav navbar-nav">
        <li role="presentation">
            {
                isString(props.action) ?
                    <Link to={props.action}>
                        {props.value}
                    </Link>
                    :
                    <a
                        onClick={props.action}
                        className={style.clickable}
                    >
                        {props.value}
                    </a>
            }
        </li>
    </ul>
)

export default UIWrapper;

