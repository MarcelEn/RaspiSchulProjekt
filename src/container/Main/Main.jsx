import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Col, Button, Glyphicon } from 'react-bootstrap';
import Calendar from 'react-calendar';

import style from './style_module.css';

import { actions } from '../../actions';
import { popupId, appointmentInit } from '../../constants';
import { proxyToValue } from '../../globalFunctions';
import CalendarView from '../CalendarView/CalendarView';
import LoadingButton from '../../components/LoadingButton/LoadingButton';
class Main extends Component {
    constructor(props) {
        super(props);
        this.filterOwnCalendar = this.filterOwnCalendar.bind(this);
        this.filterOthersCalendar = this.filterOthersCalendar.bind(this);
        this.handleFilterToggle = this.handleFilterToggle.bind(this);
        this.isCalendarActive = this.isCalendarActive.bind(this);
    }
    filterOwnCalendar() {
        return this.props.calendarData.filter(
            calendar => calendar.owner_id === this.props.userId
        )
    }
    handleFilterToggle(proxy) {
        this.props.toggleMainCalendarFilter(proxyToValue(proxy));
    }
    isCalendarActive(calendarId) {
        return this.props.ui.activeCalendars.find(
            calendar_id => calendar_id === calendarId
        )
    }
    filterOthersCalendar() {
        return this.props.calendarData.filter(
            calendarData => this.props.savedCalendars.find(
                savedCalendar => savedCalendar === calendarData.calendar_id
            )
        )
    }
    render() {
        return (
            <div className={style.rowHeightCorrection}>
                <Col className={style.sideBarWrapper} xs={12} sm={3} lg={2}>
                    <Calendar
                        className={style.calendar}
                        onClickDay={this.props.setCalendarViewDateOfMonday}
                    />

                    <div className={style.textCentering}>
                        <h3>Kalender</h3>
                        {
                            this.filterOwnCalendar().map((calendar, index) =>
                                <div key={'ownCalendarFilter-' + index}>
                                    <Button
                                        className={style.large + ' ' + style.marginBottom}
                                        bsStyle={this.isCalendarActive(calendar.calendar_id) ? 'success' : 'default'}
                                        onClick={this.handleFilterToggle}
                                        value={calendar.calendar_id}
                                    >
                                        {calendar.calendar_title}
                                    </Button>
                                    {' '}
                                    <Glyphicon
                                        className={style.downloadIcon}
                                        glyph="download"
                                        onClick={() => this.props.downloadCalendar(calendar.calendar_id)}
                                    />
                                </div>
                            )
                        }
                        <hr />
                        {
                            this.filterOthersCalendar().map((calendar, index) =>
                                <div key={'othersCalendarFilter-' + index}>
                                    <Button
                                        className={style.large + ' ' + style.marginBottom}
                                        bsStyle={this.isCalendarActive(calendar.calendar_id) ? 'success' : 'default'}
                                        onClick={this.handleFilterToggle}
                                        value={calendar.calendar_id}
                                    >
                                        {calendar.calendar_title}
                                    </Button>
                                    {' '}
                                    <Glyphicon
                                        className={style.downloadIcon}
                                        glyph="download"
                                        onClick={() => this.props.downloadCalendar(calendar.calendar_id)}
                                    />
                                </div>
                            )
                        }
                        <hr />
                        <Button
                            bsStyle="primary"
                            className={style.large + ' ' + style.downloadIcon}
                            onClick={this.props.uploadCalendar}
                        >
                            <Glyphicon
                                glyph="upload"
                            />
                        </Button>
                        <hr />
                        <Button
                            className={style.large + ' ' + style.marginBottom}
                            bsStyle="primary"
                            onClick={() => { this.props.setPopupId(popupId.MANAGE_CALENDAR) }}
                        >
                            Bearbeiten
                        </Button>
                        <Button
                            className={style.large + ' ' + style.marginBottom}
                            bsStyle="primary"
                            onClick={() => { this.props.setPopupId(popupId.CREATE_CALENDAR) }}
                        >
                            Erstellen
                        </Button>
                        <Button
                            className={style.large}
                            bsStyle="primary"
                            onClick={() => { this.props.setPopupId(popupId.ADD_CALENDAR) }}
                        >
                            Suchen
                        </Button>
                        <hr />
                        <Button
                            className={style.large}
                            bsStyle="primary"
                            onClick={() => {
                                this.props.initNewEditAppointment();
                                this.props.setPopupId(popupId.EDIT_APPOINTMENT)
                            }}
                        >
                            Termin erstellen
                        </Button>
                        <hr />
                        <Button
                            className={style.large}
                            bsStyle="primary"
                            onClick={() => { this.props.setPopupId(popupId.USER_SETTINGS) }}
                        >
                            Einstellungen
                        </Button>
                        <hr />
                        <LoadingButton loading={this.props.logoutLoading}>
                            <Button
                                className={style.large}
                                bsStyle={this.props.logoutError ? 'danger' : 'primary'}
                                onClick={this.props.sendLogout}
                            >
                                Logout
                        </Button>
                        </LoadingButton>
                    </div>
                </Col>
                <Col className={style.calendarView} xs={12} sm={9} lg={10}>
                    <CalendarView />
                </Col>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ui: state.ui.mainUi,
        userId: state.data.appData.userId,
        calendarData: state.data.appData.calendarData,
        savedCalendars: state.data.appData.savedCalendars,
        logoutLoading: state.data.appData.logoutLoading,
        logoutError: state.data.appData.logoutError
    };
}

function mapDispatchToProps(dispatch) {
    return {
        setPopupId: id => { dispatch(actions.setPopupId(id)) },
        toggleMainCalendarFilter: calendarId => { dispatch(actions.toggleMainCalendarFilter(calendarId)) },
        setCalendarViewDateOfMonday: day => { dispatch(actions.setCalendarViewDateOfMonday(day)) },
        initNewEditAppointment: () => { dispatch(actions.setEditAppointmentAppointmentData(appointmentInit)) },
        downloadCalendar: calendarId => { dispatch(actions.downloadCalendar(calendarId)) },
        sendLogout: () => { dispatch(actions.sendLogout()) },
        uploadCalendar: () => { dispatch(actions.uploadCalendar()) }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)