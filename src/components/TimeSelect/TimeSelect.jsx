import React from 'react';
import style from './style_module.css';
import { FormControl } from 'react-bootstrap';

const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
const minutes = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];


const TimeSelect = props => {
    if (props.type === "minute") {
        return (
            <FormControl value={props.value}
                onChange={props.onChange}
                name={props.name}
                componentClass="select">
                {
                    minutes.map(
                        minute =>
                            <option value={minute} key={"minute-" + minute}>
                                {minute}
                            </option>
                    )
                }
            </FormControl>
        )

    }
    return (
        <FormControl value={props.value}
            onChange={props.onChange}
            name={props.name}
            componentClass="select">
            {
                hours.map(
                    hour =>
                        <option value={hour} key={"hour-" + hour}>
                            {hour}
                        </option>
                )
            }
        </FormControl>

    )
}

export default TimeSelect;