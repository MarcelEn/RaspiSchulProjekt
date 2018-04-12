import React from 'react';
import { Link } from 'react-router-dom';
const UIWrapper = props => (
    <ul className="nav navbar-nav">
        <li role="presentation">
            <Link to={props.path}>
                {props.value}
            </Link>
        </li>
    </ul>
)

export default UIWrapper;

