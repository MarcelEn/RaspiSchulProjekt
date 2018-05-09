import React, { cloneElement } from 'react';

import style from './style_module.css';
import CollapseArrow from '../CollapseArrow/CollapseArrow';



const getWrapperClasses = props => {
    if (props.showPopup) {
        return style.popupWrapper;
    }
    return style.popupWrapper + ' ' + style.hide;
}

export const PopupWrapper = props => (
    <div className={getWrapperClasses(props)}>
        {
            props.children.filter(child => child.props.id === props.popupId)
                .map(
                    (child, index) => cloneElement(
                        child,
                        {
                            closePopup: props.closePopup,
                            key: 'popupWindow-' + index
                        }
                    )
                )
        }
    </div >
)

export const Popup = props => (
    <div className={style.popup}>
        <div
            className={style.closeButton}
            onClick={props.closePopup}
        >
            <CollapseArrow />
        </div>
        <div className={style.popupContent}>
            {props.children}
        </div>
    </div>
)