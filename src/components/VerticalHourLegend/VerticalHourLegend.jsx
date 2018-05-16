import React from 'react';
import style from './style_module.css';

const getArray = length => {
    let array = [];
    for (let i = 0; i < length; i++) {
        array.push(undefined);
    }
    return array;
}

const VerticalHourLegend = props => (
    <div className={style.wrapper}>
        {
            getArray(48).map((e, index) =>
                <div className={style.element}>
                    {
                        props.legend ?
                            index !== 0 ?
                                <div className={style.legend}>
                                    {
                                        index % 2 === 0 ?
                                            index / 2 + ':00'
                                            :
                                            Math.floor(index / 2) + ':30'
                                    }
                                </div>
                                :
                                ''
                            :
                            ''
                    }
                </div>
            )
        }
    </div>
)

export default VerticalHourLegend;