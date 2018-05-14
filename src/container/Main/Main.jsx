import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';

import style from './style_module.css';

import { actions } from '../../actions';
import { popupId } from '../../constants';

class Main extends Component {
    constructor(props) {
        super(props);
        this.formatOwnCalendar = this.formatOwnCalendar.bind(this);
    }
    formatOwnCalendar() {
        return this.props.calendarData.filter(
            calendar => calendar.owner_id === this.props.userId
        )
    }
    render() {
        return (
            <Row className={style.rowHeightCorrection}>
                <Col className={style.sideBarWrapper} xs={12} md={3} lg={2}>
                    <Calendar className={style.calendar} />

                    <div className={style.textCentering}>
                        <h3>Kalender</h3>
                        {
                            this.formatOwnCalendar().map((calendar, index) =>
                                <Button
                                    key={'ownCalendarFilter-' + index}
                                    className={style.large + ' ' + style.marginBottom}
                                    bsStyle="success"
                                // onClick={() => { props.setPopupId(popupId.MANAGE_CALENDAR) }}
                                >
                                    {calendar.calendar_title}
                                </Button>
                            )
                        }
                        <Button
                            className={style.large}
                            bsStyle="primary"
                            onClick={() => { this.props.setPopupId(popupId.MANAGE_CALENDAR) }}
                        >
                            Kalender verwalten
                        </Button>
                        <hr />
                        <Button
                            className={style.large}
                            bsStyle="primary"
                            onClick={() => { this.props.setPopupId(popupId.ADD_CALENDAR) }}
                        >
                            Kalender hinzufügen
                        </Button>
                    </div>
                </Col>
            </Row>
        );
    }
}

function mapStateToProps(state) {
    return {
        userId: state.data.appData.userId,
        calendarData: state.data.appData.calendarData,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setPopupId: id => { dispatch(actions.setPopupId(id)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)