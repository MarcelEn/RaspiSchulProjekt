import React, { cloneElement } from 'react';
import { Button } from 'react-bootstrap';

import style from './style.css';
import Centering from '../Centering/Centering';
import Card from '../Card/Card';



const getWrapperClasses = props => {
    if (props.popupId) {
        return style.popupBackground;
    }
    return style.popupBackground + ' ' + style.popupHide;
}

const toArray = value => {
    if (typeof value === 'object') {
        return [value];
    } else {
        return value;
    }
}

export const PopupWrapper = props => (
    <div >
        <div className={getWrapperClasses(props)} />
        {toArray(props.children)
            .filter(child => child.props.id === props.popupId)
            .map((child, index) => cloneElement(child, { closePopup: props.closePopup, key: 'popupWindow-' + index })
            )
        }
    </div>
)

export const Popup = props => (
    <Centering>
        <Card>
            <div className={style.closeButton}>
                <Button
                    bsStyle="danger"
                    onClick={props.closePopup}
                >
                    X
                </Button>
            </div>
            {props.children}
        </Card>
    </Centering>
)