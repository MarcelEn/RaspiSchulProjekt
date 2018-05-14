import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Button } from 'react-bootstrap';
import Calendar from 'react-calendar';

import style from './style_module.css';

import { actions } from '../../actions';
import { popupId } from '../../constants';
import { proxyToValue } from '../../globalFunctions';
class Main extends Component {
    constructor(props) {
        super(props);
        this.formatOwnCalendar = this.formatOwnCalendar.bind(this);
        this.handleFilterToggle = this.handleFilterToggle.bind(this);
        this.isCalendarActive = this.isCalendarActive.bind(this);
    }
    formatOwnCalendar() {
        return this.props.calendarData.filter(
            calendar => calendar.owner_id === this.props.userId
        )
    }
    handleFilterToggle(proxy) {
        this.props.toggleMainCalendarFilter(proxyToValue(proxy));
    }
    isCalendarActive(calendarId){
        return this.props.ui.activeCalendars.find(
            calendar_id => calendar_id === calendarId
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
                                    bsStyle={this.isCalendarActive(calendar.calendar_id) ? 'success' : 'default'}
                                    onClick={this.handleFilterToggle}
                                    value={calendar.calendar_id}
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
        ui: state.ui.mainUi,
        userId: state.data.appData.userId,
        calendarData: state.data.appData.calendarData,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setPopupId: id => { dispatch(actions.setPopupId(id)) },
        toggleMainCalendarFilter: calendarId => { dispatch(actions.toggleMainCalendarFilter(calendarId)) },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)