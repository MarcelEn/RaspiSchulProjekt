import React from 'react';
import style from './style.css';
import { Row, Col, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';
import { popupId } from '../../constants';

const Main = props => (
    <Row className={style.rowHeightCorrection}>
        <Col className={style.sideBarWrapper} xs={12} md={3} lg={2}>
            <Calendar className={style.calendar} />

            <div className={style.textCentering}>
                <h4>{'<FilterOptions />'}</h4>
                <div className={style.spacer}>
                    <Button
                        className={style.large}
                        bsStyle="primary"
                        onClick={()=>{props.setPopupId(popupId.ADD_CALENDAR)}}
                    >
                        Kalender hinzufügen
                    </Button>
                </div>
            </div>
        </Col>
    </Row>
)

export default Main;