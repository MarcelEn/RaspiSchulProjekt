import React from 'react';
import style from './style_module.css';
import ReactQuill from 'react-quill';
import { Button, ButtonGroup } from 'react-bootstrap';
import CollapseArrow from '../CollapseArrow/CollapseArrow';
import moment from 'moment';


const getDurationText = (start, end) => {
    const startMoment = moment(start);
    const endMoment = moment(end);
    if (startMoment.format("YYYY-MM-DD") === endMoment.format("YYYY-MM-DD")) {
        return startMoment.format("DD.MM.YYYY hh:mm") + "-" + endMoment.format("hh:mm")
    }
}

const DetailedAppointmentView = props => (
    <div>
        <div className={style.heading}>
            <div className={style.floatLeft}>
                {props.appointment_title}
            </div>
            <div className={style.floatRight}>
                <span className={style.durationText}>
                    {getDurationText(props.start, props.end)}
                </span>
                {
                    props.showEditButtons ? ' ' : ''
                }
                {
                    props.showEditButtons ?
                        <ButtonGroup>
                            <Button onClick={props.handleEdit} bsStyle="primary">
                                bearbeiten
                            </Button>
                            {
                                props.confirmDeletion ?
                                    <Button onClick={props.handleDelete} bsStyle="danger">
                                        sicher?
                                    </Button>
                                    :
                                    <Button onClick={props.handleDelete} bsStyle="danger">
                                        löschen
                                </Button>
                            }

                        </ButtonGroup>
                        :
                        ''
                }
                {" "}
                <CollapseArrow isOpen onClick={props.handleClose} />
            </div>
        </div>
        <div className={style.description}>
            <ReactQuill
                value={props.appointment_description}
                theme="bubble"
                readOnly
            />
        </div>
    </div>
)

export default DetailedAppointmentView;